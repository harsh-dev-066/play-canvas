import { ServerResponse } from 'http';

interface ApiResponse {
  status: number;
  message: string;
  success: boolean;
}

interface SuccessApiResponse<T> extends ApiResponse {
  result: T;
  pagination?: any; // Replace 'any' with the actual type for pagination if needed
}

interface ErrorApiResponse extends ApiResponse {
  error: any; // Replace 'any' with the actual type for error if needed
}

const sendResponse = async <T>(
  res: ServerResponse,
  statusCode: number,
  message: string,
  success: boolean,
  result?: T,
  pagination?: any,
) => {

  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  const responseBody: SuccessApiResponse<T> = {
    status: statusCode,
    message,
    success,
    result: result as T,
    pagination,
  };
  res.write(JSON.stringify(responseBody));
  res.end();
};

const sendError = async (
  res: ServerResponse,
  statusCode: number,
  message: string,
  success: boolean,
  error: any
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  const responseBody: ErrorApiResponse = {
    status: statusCode,
    message,
    success,
    error,
  };
  res.write(JSON.stringify(responseBody));
  res.end();
};

export { sendResponse, sendError };
