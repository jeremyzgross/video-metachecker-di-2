import { db } from "../0_Config/config";

export const _getVideoProfile = async(user_id: number, profile_id:number)=>{
  try{
    const [selectedVideoProfile] = await db('video_metadata').select('*').where('user_id', user_id)
      .andWhere('id', profile_id);
       return selectedVideoProfile;
  }catch (error) {
    console.error("Error fetching video profile:", error);
    throw error;
  }
};
