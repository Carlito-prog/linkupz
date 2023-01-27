import UserModel, { UserCompare } from './users.model'
import userInterface from './users.interface'
import jwt from '@/utils/auth/jwt'


const findUser = async (username: string) : Promise<typeof UserModel| null> => {
    try {
        return await UserModel.findOne({username})
    } catch(err){
        throw Error('User is not found')
    }
}

const registerUser = async (user: userInterface) => {
    const {username, password} = user
    // UserModel.findOne({username})
    await findUser(user.username)
    .then((user)=> {
        if(user){
            const msg = "the given username is already in use"
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

const loginUser = async (user: userInterface)=> {
    var {username, password} = user
    if(!findUser(username)){
        throw Error('User is not found')
    } else {
        await findUser(username)
    .then(()=>{
        return Promise.all([UserCompare.comparePass(password), user])
    })
    .then((returnedPasswordAndUser)=>{
        if (!returnedPasswordAndUser[0]) {
            throw new Error("Invalid Password");
          }
          let usr = returnedPasswordAndUser[1]
            return jwt.CreateToken(usr._id)
        })
    }
}



export {registerUser, loginUser}

