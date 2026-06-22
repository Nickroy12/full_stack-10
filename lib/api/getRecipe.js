import { serverFetch } from "../core/server"

export const getAllRecipe = async()=>{
     return serverFetch('/api/recipe')
}
