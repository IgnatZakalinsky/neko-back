import express from "express";
import {shopGet} from "./s-1-controllers/shopGet";
import {shopPost} from "./s-1-controllers/shopPost";
import {shopPut} from "./s-1-controllers/shopPut";
import {shopDelete} from "./s-1-controllers/shopDelete";

const shop = express.Router();

shopGet('/', shop);
shopPost('/', shop);
shopPut('/', shop);
shopDelete('/', shop);

export default shop;