import { hashManager } from "../utils.js";
import usersRepository from "../database/repositories/userRepository.js";
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
        }
    };
})();


export default authController; 