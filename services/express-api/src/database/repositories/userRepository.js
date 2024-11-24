import userModel from "../models/usersModel.js"; // Import the Mongoose model
import { logger } from "../../server/config/logger-config.js";

const usersRepository = (function () {
  return {
    addUser: async (user) => {
      return await userModel.create(user);
    }
  };
})();

export default usersRepository;
