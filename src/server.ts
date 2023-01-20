import App from './app'
import 'dotenv/config'
import config from "../config/development"
import 'module-alias/register'
import validateEnv from './utils/validateEnv'
import UserControllers from './resources/users/users.controllers'

validateEnv();

const app = new App([ new UserControllers()], Number(config.PORT))

app.listen();