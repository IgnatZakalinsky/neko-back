import express from "express";
import {shopGet} from "./s-1-controllers/shopGet";
import {shopPost} from "./s-1-controllers/shopPost";
import {shopPut} from "./s-1-controllers/shopPut";
import {shopDelete} from "./s-1-controllers/shopDelete";
import {shopBuyPost} from "./s-1-controllers/shopBuyPost";
import {shopRatingPut} from "./s-1-controllers/shopRatingPut";

const shop = express.Router();

shopGet('/', shop);
shopPost('/', shop);
shopPut('/', shop);
shopDelete('/', shop);

shopBuyPost('/buy', shop);
shopRatingPut('/rating', shop);

export default shop;