import userModel from "../models/usersModel.js"; // Import the Mongoose model

const usersRepository = (function () {
  return {
    addUser: async (user) => {
      return await userModel.create(user);
    },

    userExists: async (user_name) => {
      return await userModel.findOne({user_name});
    },
    
    findById: async (_id) => {
      return await userModel.findOne({_id});
    }
  };
})();

export default usersRepository;
