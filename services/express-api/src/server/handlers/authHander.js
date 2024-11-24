import authController from "../../controllers/authController.js";

const authHandler = (function(){
    return{
        registerUserHandler: async (user) => {
            return await authController.registerUserController(user);
        }
    };
})();


export default authHandler; 