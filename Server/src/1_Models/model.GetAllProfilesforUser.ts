import { db } from "../0_Config/config";

export const _getAllVideoProfilesForUser = async(user_id:number)=>{
  try{
    const allVideoProfiles = await db('video_metadata').select('*').where('user_id', user_id)
    return allVideoProfiles
  }catch(error){
    console.error("Error fetching all video profiles for user", error)
    throw error
  }
}