import mongoose, {Schema, Document} from "mongoose";

export interface IMessage extends Document {
    _id: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    authorId: mongoose.Types.ObjectId;

    message: string;

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const Message: Schema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        messages: {
            type: String,
            required: true
        },

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);

export default mongoose.model<IMessage>('message', Message);