'use server'
import { serverMutation } from "../core/server"
import { revalidatePath } from "next/cache"

export const updateStatus = async (id , data)=>{
    return serverMutation(`/api.recipe/${id}`, data , 'PATCH')
}
export const likeCount = async (id, userId) => {
    return serverMutation(`/api/recipe/${id}/like`, { userId }, 'PATCH')
    revalidatePath(`/recipes/details/${id}`)
}