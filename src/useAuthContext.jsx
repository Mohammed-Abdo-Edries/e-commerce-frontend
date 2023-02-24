import { AuthContext } from "../Context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('useAuthcontext must be used inside an AuthContextProvider')
    }
    return context
}