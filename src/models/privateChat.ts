import mongoose, {Schema, Document} from "mongoose";

export interface IPrivateChat extends Document {
    _id: mongoose.Types.ObjectId;
    user1Id: mongoose.Types.ObjectId;
    user2Id: mongoose.Types.ObjectId;

    messages: mongoose.Types.ObjectId[];

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const PrivateChat: Schema = new Schema(
    {
        user1Id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        user2Id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        messages: [{
            type: Schema.Types.ObjectId,
        }],

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);

export default mongoose.model<IPrivateChat>('private-chat', PrivateChat);