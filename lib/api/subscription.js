import { serverFetch } from "../core/server"

export const getSubscription = async(subId)=>{
    return serverFetch(`/api/subscription?sub_id=${subId}`)
}
export const getAllSubscription = async()=>{
    return serverFetch(`/api/subscription`)
}