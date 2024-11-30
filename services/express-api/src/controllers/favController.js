import itemsRepository from "../database/repositories/itemsRepository.js";
import usersRepository from "../database/repositories/userRepository.js";

const favController = (function(){
    return{
        addItemToUser: async (currentUserDocument, item_id) => {
            //check if the item id that I want to add already exists in users favorites
            if(currentUserDocument.favorites.includes(item_id)) return currentUserDocument;
            //add the new favorite item if it already does not exist
            currentUserDocument.favorites.push(item_id);
            const updatedUserDocument = await usersRepository.updateUser(currentUserDocument._id, currentUserDocument);
            return updatedUserDocument;
        }, 

        deleteItemFromUser: async (currentUserDocument, item_id) => {
            const index = currentUserDocument.favorites.indexOf(item_id);  
            if(index == -1) return currentUserDocument;
            //add the new favorite item if it already does not exist
            currentUserDocument.favorites.splice(index, 1);
            const updatedUserDocument = await usersRepository.updateUser(currentUserDocument._id, currentUserDocument);
            return updatedUserDocument;
        },

        retrieveFavoriteItems: async (user) => {
            return await itemsRepository.getAllSpecifiedItems(user.favorites);
        }  

    };
})();

export default favController; 