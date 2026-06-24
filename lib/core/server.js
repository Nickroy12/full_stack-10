import { headers } from "next/headers";
import { auth } from "../auth";
import { authClient } from "../auth-client";
import { getUserToken } from "./sessions";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;

}
export const serverFetch = async(path)=>{
  
try {

    const res = await fetch(`${baseUrl}${path}`,{
      headers:await authHeader()
      
    })
  return await res.json()
  
} catch (error) {
  console.log(error);
  return {}
}
}

export const serverMutation = async (path, data, method = 'POST') => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeader())
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.log(error);
    return {};
  }
};