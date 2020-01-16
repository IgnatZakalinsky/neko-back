import express from "express";
import {usersGet} from "./usersGet";

const users = express.Router();

usersGet('/', users);

export default users;