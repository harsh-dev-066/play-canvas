import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';
import { sendError, sendResponse } from '../handlers/response.handler';
import { AuthMiddlewareInterface } from '../types/middleware.interface';
import { isTokenValid } from '../helpers/token.helper'


const authenticateUser: AuthMiddlewareInterface['authenticate'] = async (req, res, next) => {
    try {
        const accessToken = req.headers['authorization'] as string | undefined;
        if (!accessToken) {
            throw new ErrorHelper('Unauthorized Access', StatusCodes.UNAUTHORIZED);
        }

        const bearerToken = accessToken.split(' ')[1];

        if (accessToken) {
            const payload = isTokenValid(bearerToken);
            if (!payload) {
                throw new ErrorHelper('Unauthorized Access', StatusCodes.UNAUTHORIZED);

            }

            res.locals.user = payload;

            return next();
        } else {
            throw new ErrorHelper('Unauthorized Access', StatusCodes.UNAUTHORIZED);

        }
    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);
    }
};

const isAuthenticated: AuthMiddlewareInterface['authenticationCheck'] = (req, res, next) => {
    const { userId } = req.body
    try {
        const checker = res.locals.user.id === (userId || null)?.toString();
        if (!checker) {
            throw new ErrorHelper('Unauthorized Access', StatusCodes.UNAUTHORIZED);

        }
        next();

    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);

    }
};


export { authenticateUser, isAuthenticated };
