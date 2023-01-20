import jwt, {Secret, JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import { Request, Response, NextFunction } from 'express'

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.x_auth_token;
    try {
        if (!token) {
            throw Error()
    } else {
        const decoded = jwt.verify(token, config.get<Secret>('Jwt_Secret_Key'));
         (req as CustomRequest).token = decoded;
         next();
    }}
    catch(err) {
        res.status(401).send('Please authenticate');
    }
}

export default requireAuth