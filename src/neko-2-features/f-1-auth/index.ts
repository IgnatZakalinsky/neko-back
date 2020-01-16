import express from "express";
import {authGet} from "./a-1-controllers/authGet";
import {authLoginPost} from "./a-1-controllers/authLoginPost";
import {authRegisterPost} from "./a-1-controllers/authRegisterPost";
import {authForgotPost} from "./a-1-controllers/authForgotPost";
import {authMePost} from "./a-1-controllers/authMePost";

const auth = express.Router();

authGet('/', auth); // for dev

authLoginPost('/login', auth);
authRegisterPost('/register', auth);
authForgotPost('/forgot', auth);
authMePost('/me', auth);

export default auth;
