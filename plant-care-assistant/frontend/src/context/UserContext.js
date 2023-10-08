import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { baseURL } from "../utils/constants";
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

// export const useUser = () => {
//     return useContext(UserContext);
//   };

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    console.log("user context: ", user);
    useEffect(() => {
        if(!user) {
            axios.get(`${baseURL}/profile`, { withCredentials: true }).then(({data}) => {
                // if( data?.data == "token expired")
                // {
                //     navigate("/login");
                //     window.localStorage.clear();
                // }
                // else{
                    if(data.email){
                    setUser(data)}
                    else{
                        navigate("/login");
                        window.localStorage.clear();
                    }
                // }
                
                
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}