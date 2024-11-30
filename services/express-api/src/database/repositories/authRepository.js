import Blacklist from "../models/blacklistModel.js";

const authRepository = (function () {
  return {
    isBlacklisted: async (token) => {
        return await Blacklist.findOne({ token });
    }, 

    addToBlacklist: async (token) => {

        const newBlacklist = new Blacklist({ token });
        
        await newBlacklist.save();
    }
  };
})();

export default authRepository;