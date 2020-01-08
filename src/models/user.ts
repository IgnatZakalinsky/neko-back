import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    isAdmin: boolean;
    token: string;
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
    }

});

export default mongoose.model<IUser>('user', UserSchema);