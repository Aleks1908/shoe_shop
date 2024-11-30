import itemsRepository from "../database/repositories/itemsRepository.js";

const itemsController = (function(){
    return{
        fetchItems: async (category) => {
            let items; 
            if(!category){
                items = await itemsRepository.getAllItems();
                return items; 
            }
            items = await itemsRepository.getItemsByCategory(category);
            return items; 
        }
    };
})();

export default itemsController; 