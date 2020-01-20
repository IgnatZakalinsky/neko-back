import express from "express";
import {privateChatsGet} from "./pc-1-controllers/privateChatsGet";
import {privateChatMessagesGet} from "./pc-1-controllers/privateChatMessagesGet";
import {privateChatPost} from "./pc-1-controllers/privateChatPost";
import {privateChatMessagesPost} from "./pc-1-controllers/privateChatMessagesPost";

const privateChats = express.Router();

privateChatsGet('/', privateChats);
privateChatMessagesGet('/messages', privateChats);
privateChatPost('/', privateChats);
privateChatMessagesPost('/messages', privateChats);

export default privateChats;