import { createContext,useState } from 'react';
import { useAuth } from '@clerk/clerk-react'; 

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [credits, setCredits] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {getToken}= useAuth()

    const localCreditsData = async () => {
        try {
            

        } catch (error) {

        }
     
    }
    const value = {

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;