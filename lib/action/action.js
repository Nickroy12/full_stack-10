'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createRecipe = async(newRecipe)=>{
 const res = await fetch(`${baseUrl}/api/recipe`,{
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRecipe)
 })
 return res.json()
}