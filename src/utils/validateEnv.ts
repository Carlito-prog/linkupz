 import { cleanEnv, str, port } from 'envalid'

 const validateEnv = () : void => {
    if (process.env.Node_env === 'development'){
        cleanEnv(process.env, {
            Node_env: str({
                choices: ['development','production']
            }),
            Mongo_User: str(),
            Mongo_Pass: str(),
            Mongo_Path: str(),
            PORT: port({ default: 3000 })
        })
    } else {
        cleanEnv(process.env.production, {
            Node_env: str({
                choices: ['production']
            }),
            Mongo_User: str(),
            Mongo_Pass: str(),
            Mongo_Path: str(),
            PORT: port({ default: 8080 })
        })
    }
 }

 export default validateEnv