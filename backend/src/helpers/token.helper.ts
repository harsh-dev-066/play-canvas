import jwt, { Secret } from 'jsonwebtoken';


const createJWT = (payload: Record<string, unknown>, expiresIn: string = '15d'): string => {
    // Check if JWT_SECRET is defined
    // if (!process.env.JWT_SECRET) {
    //     throw new Error('JWT_SECRET is not defined in the environment variables');
    // }

    const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
        expiresIn: expiresIn,
    });

    return token;
};

const isTokenValid = async (token: string): Promise<any | false> => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (err) {
        return false;
    }
};

export {
    createJWT,
    isTokenValid,
};
