import React from 'react';

const Upload: React.FC = () => {
  return (
    <>
      <div>
        <h1>File upload form</h1>
        <form className="upload-video" encType="multipart/form-data">
          <input type="file" name="filename" />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Upload;
