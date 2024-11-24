import { hashManager } from "../utils.js";
import usersRepository from "../database/repositories/userRepository.js";
import authRepository from "../database/repositories/authRepository.js";
import { logger } from "../server/config/logger-config.js";

const authController = (function(){
    return{
        registerUserController: async ({user_name, password}) => {
            let usr = {
                user_name: user_name, 
                password: await hashManager.generateHash(password),
                favorites: []
            };
            return await usersRepository.addUser(usr);
        }, 

        loginUserController: async ({user_name, password}) => {
            //check if the user_name exists
            const user = await usersRepository.userExists(user_name);
            if(!user){
                throw Error("User does not exist.");
            }

            //check if the passwords match
            const passwordsMatch = await hashManager.hashMatch(password, user.password);
            if(!passwordsMatch){
                throw Error("Incorrect Password.");
            }

            user._doc.sessionID = hashManager.generateSessionToken(user);

            return user; 
        }, 

        logoutUserController: async (req) => {
            const authHeader = req.headers['cookie']; // get the session cookie from request header
            if (!authHeader){
                throw Error("204"); //no content
            }
            const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
            const accessToken = cookie.split(';')[0];
            const checkIfBlacklisted = await authRepository.isBlacklisted(accessToken); // Check if that token is blacklisted
            // if true, send a no content response.
            if (checkIfBlacklisted) {
                throw Error("204");
            }

            // otherwise blacklist token
            await authRepository.addToBlacklist(accessToken);

            return ({status: 200});
        }
    };
})();


export default authController; 