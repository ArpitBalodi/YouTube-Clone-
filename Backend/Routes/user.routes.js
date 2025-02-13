import { UserLogin, UserSignUp } from "../Controller/user.controller.js";

export function userRoutes(app){
    app.post("/api/signup", UserSignUp);
    app.post("/api/login", UserLogin);
}