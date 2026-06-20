import { serverMutation } from "../core/server"

export const updateStatus = async (id , data)=>{
    return serverMutation(`/api.recipe/${id}`, data , 'PATCH')
}