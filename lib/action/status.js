import { serverMutation } from "../core/server"

export const updateStatus = async (id , data)=>{
    return serverMutation(`/api.recipe/${id}`, data , 'PATCH')
}
export const likeCount = async (id, userId) => {
    return serverMutation(`/api/recipe/${id}/like`, { userId }, 'PATCH')
}