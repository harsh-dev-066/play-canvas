import { StatusCodes } from 'http-status-codes'
import { sendResponse } from '../handlers/response.handler';
import { controller_interface } from '../types/controller.interface'



const checkServer: controller_interface['basicController'] = async (req, res) => {
    sendResponse(res, StatusCodes.OK, 'Success!', true, {});
};
export { checkServer };
