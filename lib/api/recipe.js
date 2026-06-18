
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRecipe = async(userId, status = "usual")=>{
    const res = await fetch(`${baseUrl}/api/recipe?userId=${userId}&status=${status}`) 
    return res.json()
}