import { db } from "../0_Config/config";

export const _deleteVideoProfile = async (user_id: number, profile_id: number) => {
  try {
    const rowsAffected = await db('video_metadata')
      .where({ user_id, id: profile_id })
      .del();

    return rowsAffected > 0;
  } catch (error) {
    console.error("Error deleting video profile:", error);
    throw error;
  }
};
