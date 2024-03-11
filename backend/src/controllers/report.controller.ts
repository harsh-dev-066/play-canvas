import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { controller_interface } from '../types/controller.interface';
import pool from '../services/connection.pool';
import { OkPacket } from 'mysql2';

// create
const createReport: controller_interface['basicController'] = async (req, res) => {
  const file = req.file;
  const user = await res.locals.user;
  const uploadResult = await res.locals.uploadResult;

  try {
    let image_url: string;
    let report_name: string;
    if (file) {
      report_name = file.originalname;
      image_url = uploadResult.secure_url;
    }

    // Insert a delay of 60 seconds before sending the response
    const results = await pool.execute(
      'INSERT INTO reports (report_name, image_url, user_id) VALUES (?, ?, ?)',
      [report_name, image_url, user.userId]
    );
    sendResponse(res, StatusCodes.OK, 'Success!', true, results[0]);
  } catch (error: any) {
    sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
  }
};

// read
const getReportById: controller_interface['basicController'] = async (req, res) => {
  try {
    const { reportId } = req.params;
    const user = await res.locals.user;

    // Validate that reportId is a positive integer (adjust validation as needed)
    const reportIdInt = parseInt(reportId, 10);
    if (isNaN(reportIdInt) || reportIdInt <= 0) {
      throw new ErrorHelper('Invalid reportId', StatusCodes.BAD_REQUEST);
    }

    // Fetch data for the specific reportId
    const row = await pool.query('SELECT * FROM reports WHERE id = ? AND user_id = ?', [
      reportIdInt,
      user.userId,
    ]);

    // Check if a row was found

    if (!row.length) {
      throw new ErrorHelper('Report not found', StatusCodes.NOT_FOUND);
    }

    sendResponse(res, StatusCodes.OK, 'Success!', true, row[0]);
  } catch (error: any) {
    sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
  }
};

// const getReportList: controller_interface['basicController'] = async (req, res) => {
//     try {
//         const { searchPage } = req.body;
//         const user = await res.locals.user;

//         const page = parseInt(searchPage as string);
//         const pageSize = 5;
//         const offset = page * pageSize;

//         const totalCountRows: any = await pool.query('SELECT COUNT(*) as total_count FROM reports WHERE user_id = ?', [user.userId]);

//         // Get the total count value from the result
//         const totalCount = totalCountRows[0][0].total_count;

//         const rows = await pool.query('SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [user.userId, pageSize, offset]);

//         const totalPages: number = Math.ceil(totalCount / pageSize);

//         const paginationData = { page_size: pageSize, page, total_pages: totalPages };
//         sendResponse(res, StatusCodes.OK, 'Success!', true, rows[0], paginationData);
//     } catch (error: any) {
//         sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
//     }
// };

const getReportList: controller_interface['basicController'] = async (req, res) => {
  try {
    const { searchPage, searchQuery, sortQuery = 'DESC' } = req.body;
    const user = await res.locals.user;

    const page = parseInt(searchPage as string) || 1;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;

    // Get the total count value from the result
    let total_query = `SELECT COUNT(*) as total_count FROM reports WHERE user_id = ? ${
      searchQuery ? 'AND report_name LIKE ?' : ''
    }`;
    let total_parmas = searchQuery ? [user.userId, `%${searchQuery}%`] : [user.userId];
    const totalCountRows: any = await pool.query(total_query, total_parmas);
    const totalRows = totalCountRows[0][0].total_count;
    const totalPages: number = Math.ceil(totalRows / pageSize);

    // Check if searchQuery is provided
    let query = 'SELECT * FROM reports WHERE user_id = ?';
    if (searchQuery) {
      query += ' AND report_name LIKE ?';
    }

    query += ` ORDER BY created_at ${sortQuery}`;

    const queryParams = searchQuery ? [user.userId, `%${searchQuery}%`] : [user.userId];

    // Update the original query with LIMIT and OFFSET
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(pageSize, offset);

    const rows = await pool.query(query, queryParams);

    const paginationData = { page_size: pageSize, page, total_pages: totalPages, totalRows };

    sendResponse(res, StatusCodes.OK, 'Success!', true, rows[0], paginationData);
  } catch (error: any) {
    sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
  }
};

// delete
const deleteReport: controller_interface['basicController'] = async (req, res) => {
  try {
    const { reportId } = req.params;

    // Validate that reportId is a positive integer (adjust validation as needed)
    const reportIdInt = parseInt(reportId, 10);
    if (isNaN(reportIdInt) || reportIdInt <= 0) {
      throw new ErrorHelper('Invalid reportId', StatusCodes.BAD_REQUEST);
    }

    // Perform the delete operation
    const result = await pool.query('DELETE FROM reports WHERE id = ?', [reportIdInt]);

    // Check if a row was deleted
    const okPacket = result[0] as OkPacket;
    if (okPacket.affectedRows === 0) {
      throw new ErrorHelper('Report not found', StatusCodes.NOT_FOUND);
    }

    sendResponse(res, StatusCodes.OK, 'Report deleted successfully', true, { id: reportId });
  } catch (error: any) {
    sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
  }
};

export { createReport, getReportList, deleteReport, getReportById };
