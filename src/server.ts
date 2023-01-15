import App from './app'
import 'dotenv/config'
import config from "../config/development"
import 'module-alias/register'
import validateEnv from './utils/validateEnv'

validateEnv();

const app = new App([], Number(config.PORT))

app.listen();
 