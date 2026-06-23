import { serverFetch } from "../core/server"

export const plansId = async(planId)=>{
    return serverFetch(`/api/plans?plan_id=${planId}`)
}