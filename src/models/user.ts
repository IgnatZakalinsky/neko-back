import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    isAdmin: boolean;
    token: string;
    tokenDeathTime: number;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
    },
    tokenDeathTime: {
        type: Number,
    }

});

export default mongoose.model<IUser>('user', UserSchema);