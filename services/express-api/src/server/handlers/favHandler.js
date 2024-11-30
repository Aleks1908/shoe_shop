import favController from "../../controllers/favController.js";
import { logger } from "../config/logger-config.js";

const favHandler = (function(){
    return{
        
        addItem: async (user, item_id) => {
            let updatedUserDoc = await favController.addItemToUser(user, item_id);
            return updatedUserDoc; 
        }, 

        removeItem: async(user, item_id) => {
            let updatedUserDoc = await favController.deleteItemFromUser(user, item_id);
            return updatedUserDoc;
        },

        getFavorites: async (user) => {
            let items = await favController.retrieveFavoriteItems(user);
            return items;
        }
    };
})();

export default favHandler; 