import authController from "../../controllers/authController.js";

const authHandler = (function(){
    return{
        //build the response
        registerUserHandler: async (user) => {

            let response = { body:{} };
            let result; 

            try{
                result = await authController.registerUserController(user);
                const {password, ...filteredResult} = result._doc; 
                response.status = 201;
                response.body.message = filteredResult; 
                response.success = true; 

            }catch(e){
                response.success = false; 
                if(e.code == 11000){
                    response.status = 400; 
                    response.body.message = "The username already exists."; 
                }else{
                    response.status = 500; 
                    response.body.message = "An unexpected error occured.";
                }
                
            }finally{
                return response; 
            }
            
        }
    };
})();


export default authHandler; 