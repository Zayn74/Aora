import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../lib/appwrite";


const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
const [isLogged, setIsLogged] = useState(false)
const [user, setUser] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    getUser().then((res) => {
        if (res) {
            setIsLogged(true)
            setUser(res)
        } else {
            setIsLogged(false)
            setUser(null)
    }
    }).catch((error) => {
    console.log(error);
    }).finally(() => {
    setIsLoading(false)
})
}, [])

    return(
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                isLoading
        }}
        >
        {children}
        </GlobalContext.Provider>
    )
} 
export default GlobalProvider;
