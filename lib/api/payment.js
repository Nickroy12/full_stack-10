import { serverFetch } from "../core/server"

export const getPayment = async(payId)=>{
    return serverFetch(`/api/payment?pay_id=${payId}`)
}
export const getAllPayment = async()=>{
    return serverFetch(`/api/payment`)
}