import Joi from "joi";
import Users from "./users.interface";

// Validation for services
const create = Joi.object<Users>({ 
    username: Joi.string().required, 
    password: Joi.string().required 
})

const update = Joi.object<Users>({ 
    username: Joi.string().required, 
    password: Joi.string().required 
})


export default { create, update }