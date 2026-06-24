'use server'

import { authClient } from "../auth-client";
import { authHeader } from "../core/server";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createRecipe = async(newRecipe)=>{


 const res = await fetch(`${baseUrl}/api/recipe`,{
    method: "POST",
    headers:{
        'Content-Type': 'application/json',
        ...await authHeader()
    },
    body: JSON.stringify(newRecipe)
 })
 return res.json()
}