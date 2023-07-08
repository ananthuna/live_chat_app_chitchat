import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import { UserContext } from '../Context/Context'
import axios from '../axios'
import { Box, Typography } from "@mui/material";
import { baseUrl } from '../url';

const UploadAndDisplayImage = ({user}) => {
  const [images, setImages] = useState();
  const { setImage } = useContext(UserContext);
  const { setProfilePhoto } = useContext(UserContext);

  const upload = (event) => {
    setImages(event.target.files[0]);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name',user.Name)
    axios.post(`${baseUrl}/imageUpdate`, data, { withCredentials: true }).then((doc) => {
    
    })
  }

  const uploadFile = () => {
    console.log('img uploaded')
    setImage(false)
    setProfilePhoto(false)
  }

  return (
    <Box>
      <Typography>Upload Image</Typography>
      {images && (
        <div>
          <img alt="not fount" width={"250px"} src={user.imageURL} />
          <br />
          <Button onClick={uploadFile} sx={{ mt: 1, mb: 1, pl: 2 }} variant="contained">Upload</Button>
        </div>
      )}
      <input
        type="file"
        name="file"
        onChange={upload}
      />
    </Box>
  );
};

export default UploadAndDisplayImage;