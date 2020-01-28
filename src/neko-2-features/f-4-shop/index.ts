import express from "express";
import {shopGet} from "./s-1-controllers/shopGet";

const shop = express.Router();

shopGet('/', shop);

export default shop;