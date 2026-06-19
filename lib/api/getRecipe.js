import { serverFetch } from "../core/server"

export const getRecipe = async()=>{
     return serverFetch('/api/recipe')
}