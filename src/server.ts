const App = require('./app') 
const UserControllers = require('./resources/users/users.controllers') 
import 'dotenv/config'
import config from "../config/development"
import 'module-alias/register'
import validateEnv from './utils/validateEnv'


validateEnv();

const app = new App([new UserControllers()], Number(config.PORT))

app.listen();