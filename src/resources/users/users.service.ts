import UserModel from './users.model'
import userInterface from './users.interface'
import jwt from '@/utils/auth/jwt'

const registerUser = (user: userInterface) => {
    const {username, password} = user
    UserModel.findOne({username})
    .then((user)=> {
        if(user){
            const msg = "the given email is already in use..."
            throw Error(msg)
        } else {
            return UserModel.create({ username, password });
        }
    }).then(
        (createdUser)=>{
            const token = jwt.CreateToken(createdUser._id)
            return token
        }
    )
}



export {registerUser}

