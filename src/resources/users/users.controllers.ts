import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interfaces'
import HttpException from '@/middleware/exceptions/http.exception'
import UserValidationMiddleware from '@/middleware/user.val.middleware'
import validate from '@/resources/users/users.validation'
import {registerUser} from "./users.service"
import UserInterface from "./users.interface"
import config from 'config'

class Users implements Controller {
    public path = '/users'
    public router = Router()

    constructor() {
        this.initializeRouter();
    }
    private initializeRouter(): void {
        this.router.post(
            `${this.path}`,
            UserValidationMiddleware(validate.create),
            this.register
        )
    }
    private register = async(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response | void> => {
        try{

            const registered = registerUser(req.body)
            res.cookie(config.get<string>('cookie'), registered)
            res.status(200)

        }catch(err:any){
            throw Error(err.message)
        }
    }
    private login = () => {
    
    }
}