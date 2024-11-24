import { hashManager } from "../utils.js";
import usersRepository from "../database/repositories/userRepository.js";

const authController = (function(){
    return{
        registerUserController: async ({user_name, password}) => {
            let usr = {
                user_name: user_name, 
                password: await hashManager.generateHash(password),
                favorites: []
            };
            return await usersRepository.addUser(usr);
        }
    };
})();


export default authController; 