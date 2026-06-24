import { serverMutation } from "../core/server"

export const createPayment =async(payInfo)=>{
    return serverMutation('/api/payment', payInfo)
}