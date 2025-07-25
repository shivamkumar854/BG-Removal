import { createContext, useState } from 'react';
import { useAuth, useUser,useClerk } from '@clerk/clerk-react'; // ✅ Corrected imports
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom'

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(0);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const { getToken } = useAuth();     // ✅ Correct usage
  const { isSignedIn } = useUser(); 
  const {openSignIn} = useClerk(); // ✅ Corrected typo

  const loadCreditsData = async (clerkId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { clerkid: clerkId },
      });

      if (data.success) {
        setCredit(data.credits);
        console.log("Loaded credits:", data.credits);
      }
    } catch (error) {
      console.log("Error loading credits:", error);
      toast.error(error.message);
    }
  };

  const removeBg = async (image) => {
    try {

      if (!isSignedIn) {
            return openSignIn()
      }

      setImage(image)
      setResultImage(false)

      navigate('/result')

      const token = await getToken()

      const formData = new FormData()
      image && formData.append('image',image)

      const {data} =await axios.post(backendUrl+'/api/image/remove-bg',formData,{headers:{token}})
      
       if (data.success) {
             setResultImage(data.resultimage)
             data.creditBalance && setCredit(data.creditBalance)
       } else {
         toast.error(data.message)
         data.creditBalance && setCredit(data.creditBalance)
         if (data.creditBalance === 0) {
           navigate('/buy')
         }
       }

    } catch (error) {
      console.log("Error removing background:", error);
      toast.error(error.message);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    image,
    setImage,
    removeBg
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
