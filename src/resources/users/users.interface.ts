import { Document, ObjectId } from "mongoose";

export default interface Users extends Document {
     id: ObjectId,
     username: string,
     password: string,
}