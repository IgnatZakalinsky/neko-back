import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;

    email: string;
    password: string;
    rememberMe: boolean;

    isAdmin: boolean;
    token: string;
    tokenDeathTime: number;

    _doc: object; // crutch
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
    rememberMe: {
        type: Boolean,
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