import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interfaces'
import HttpException from '@/middleware/exceptions/http.exception'
import UserValidationMiddleware from '@/middleware/user.val.middleware'
import validate from '@/resources/users/users.validation'
//import userService from '@/resources/users/users.service'



class Users implements Controller {
    public path = '/users'
    public router = Router()

    constructor() {
        this.initializeRouter();
    }
    private initializeRouter(): void {

    }

}