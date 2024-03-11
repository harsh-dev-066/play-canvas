import { StatusCodes } from 'http-status-codes'
import { sendError, sendResponse } from '../handlers/response.handler';
import { createJWT } from '../helpers/token.helper';
import { ErrorHelper } from "../helpers/error.helper"
import { loginValidate, registerValidate } from "../validators/auth.validation"
import { controller_interface } from '../types/controller.interface'
import pool from "../services/connection.pool"
import brcrypt from "bcrypt";


const Login: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = loginValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { email, password } = req.body;

        const existingUser: Record<string, any> = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = existingUser[0][0];

        if (!user) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }

        const isPasswordCorrect = await brcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new ErrorHelper('Invalid Credentials', StatusCodes.UNAUTHORIZED);
        }

        const newToken = createJWT({
            email: user.email,
            userId: user.id,
        });
        const existingToken: Record<string, any> = await pool.query('SELECT * FROM tokens WHERE user_id = ?', [user.id]);

        if (existingToken[0].length > 0) {
            const token = existingToken[0][0];
            await pool.query('UPDATE tokens SET sessions = sessions + 1, token = ? WHERE id = ?', [newToken, token.id]);
        }
        else {

            await pool.execute('INSERT INTO tokens (user_id,token) VALUES (?, ?)', [user.id, newToken]);
        }
        // await prisma.Token.create(userToken);



        sendResponse(res, StatusCodes.OK, 'successfully logged!', true, { email: user.email, name: user.email, token: newToken });

    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);
    }
};

const Register: controller_interface['basicController'] = async (req, res) => {
    try {
        const { error } = registerValidate.validate(req.body);
        if (error) {
            throw new ErrorHelper(error.message);
        }

        const { name, email, password } = req.body;


        const userAlreadyExists = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (!userAlreadyExists.length) {
            throw new ErrorHelper('This email is already registered!', StatusCodes.UNAUTHORIZED);
        }

        // Hash password
        const salt = await brcrypt.genSalt(10);
        const hashedPassword = await brcrypt.hash(password, salt);


        await pool.execute('INSERT INTO users (name,email, password) VALUES (?, ?,?)', [name, email, hashedPassword]);


        sendResponse(res, StatusCodes.CREATED, 'successfully! registered', true, { name, email });
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};
const Logout: controller_interface['basicController'] = async (req, res) => {

    try {

        res
            .clearCookie("token", { sameSite: "none", secure: true })
            .status(200)
            .json("User logged out");
    } catch (error: any) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message, false, error);

    }
};

export { Login, Register, Logout };
