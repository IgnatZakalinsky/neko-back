import express from "express";
import {filePost} from "./f-1-controllers/filePost";

const file = express.Router();

filePost('/', file);

export default file;