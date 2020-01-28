import express from "express";
import {shopGet} from "./s-1-controllers/shopGet";
import {shopPost} from "./s-1-controllers/shopPost";

const shop = express.Router();

shopGet('/', shop);
shopPost('/', shop);

export default shop;