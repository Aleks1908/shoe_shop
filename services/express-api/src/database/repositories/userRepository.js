import userModel from "../models/usersModel.js"; // Import the Mongoose model
import { logger } from "../../server/config/logger-config.js";

const usersRepository = (function () {
  return {
    addUser: async (user) => {
        try{
            userModel.create(user);     
        }catch(e){
            logger.debug(e.toString());
        }
    }
  };
})();

export default usersRepository;
