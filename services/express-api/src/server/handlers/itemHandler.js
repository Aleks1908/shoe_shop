import itemsController from "../../controllers/itemsController.js";

const itemsHandler = (function(){
    return{
        fetchItems: async (category="") => {
            let items = await itemsController.fetchItems(category);
            return items; 
        }
    };
})();

export default itemsHandler; 