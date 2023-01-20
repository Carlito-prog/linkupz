import jwt, {Secret, JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'

const CreateToken = (_id: string): Secret =>{
    const payload = {_id}
    const options = { expiresIn: "30d" }

    const token = jwt.sign(payload, config.get<string>('Jwt_Secret_Key'), options)

    return token
}


export default {CreateToken}

