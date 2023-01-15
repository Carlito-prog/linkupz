import express, { Application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import compression from 'compression'
import cors from 'cors'
import Controller from "@/utils/interfaces/controller.interfaces"
import ErrorMiddleware from "./middleware/error.middleware"
import helmet from 'helmet'

class App {
    public express: Application;
    public port: number;

    constructor (controllers:  Controller[], port: number)

    {
        this.express = express()
        this.port = port

        this.initializeDatabaseConnection()
        this.initializeMiddleware()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }
    private initializeMiddleware(): void {
        this.express.use(helmet);
        this.express.use(cors);
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(compression)
    }
    private initializeControllers(controllers: Controller[] ): void {
        controllers.forEach((c: Controller) => {
            this.express.use('/', c.router)
        })
    }
    private initializeErrorHandling(){
        this.express.use(ErrorMiddleware)
    }
    private initializeDatabaseConnection(){
        const mongo_Uri = config.get<string>('Mongo_Uri')
        
        mongoose.set("strictQuery", false);
        mongoose.connect(mongo_Uri)

        mongoose.connection.on('connected',()=>{
            console.log(`Successful connection to Database: ${mongo_Uri}`)
        })

        mongoose.connection.on('error',(err)=>{
            console.log(err)
        })

        process.on('SIGINT', function() {  
            mongoose.connection.close(function () { 
              console.log('Mongoose default connection disconnected through app termination')
              process.exit(0)})})
    }
    public listen(){
        this.express.listen(this.port, ()=> {
            console.log(`App is up and running on this port: ${this.port}`)
        })
    }
}

export default App