import React, {useState} from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { RootState, AppDispatch } from '../App/store'
import { uploadFile } from './uploadSlice';


const Upload: React.FC = () => {
 const dispatch: AppDispatch = useDispatch() 
 const {user_id} = useSelector((state:RootState)=>
  state.login
 )
  const [video, setVideo] = useState<File | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setVideo(selectedFile);
    } else {
      setVideo(null); // Optional: Reset the file state if no file is selected
    }
  };

  console.log('before handle submit->',user_id);
  
   const handleSubmit = (e: React.FormEvent) => {
    console.log('handleSubmit');
    
    e.preventDefault();
    console.log(video);
    console.log(user_id);
    
    
    if (video && user_id !== null){
    const fileInfo = {video, user_id, profile_id:9}
    dispatch(uploadFile(fileInfo));

   
  }


  };
    // setCredentials((prev) => ({ ...prev, [name]: value }));

  //  const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(uploadFile());
  // };
  return (
    <>
      <div>
        <h1>File upload form</h1>
        <form onSubmit={handleSubmit} className="upload-video" encType="multipart/form-data" >
          <input onChange={handleFileChange}type="file" name="filename" />
          <input type="submit" value="Upload"/>
        </form>
      </div>
    </>
  );
};

export default Upload;
