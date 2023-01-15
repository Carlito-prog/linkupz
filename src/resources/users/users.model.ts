import { Schema, model } from "mongoose";
import Users from "@/resources/users/users.interface"
import bcrypt from 'bcrypt'
import config from "../../../config/development"


export const UserSchema = new Schema(
    {
        id:
            {
                type: Schema.Types.ObjectId
            },
        username: 
            {
                type: String,
                required: true,
            },
        password: 
            {
                type: String,
                required:true,
            }
    },
    { timestamps: true }
)

UserSchema.methods = {
    comparePass(pass:string) {
        return bcrypt.compare(pass, this.password)
    }}

UserSchema.pre('save', async function() {
    const salt = bcrypt.genSaltSync(config.SaltRounds);

    await bcrypt.hash(this.password, salt).then(hash => {
        this.password = hash;
    })
})


export default model<Users>('Users', UserSchema)
