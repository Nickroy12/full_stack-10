import { authHeader, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRecipeById = async(recipeId)=>{
    return serverFetch(`/api/recipe/${recipeId}`)
}
export const getRecipe = async(userId, status = "usual")=>{
    const res = await fetch(`${baseUrl}/api/recipes?userId=${userId}&status=${status}`,{
        headers: await authHeader()
    }) 
    return res.json()
    
}