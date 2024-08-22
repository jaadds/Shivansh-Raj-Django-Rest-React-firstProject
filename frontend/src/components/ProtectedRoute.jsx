// This is gonna act like a wrapper for protected route and anything wrapped in this is going to be accessable to a user only on the availability of authorizarion token.

import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

// This is gonna check if authorized else gonna redirect to login page
function ProtectedRoute({children}) {
    const [isAuthorized, setAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setAuthorized(false))
    }, [])

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            // this is goig to send a response to this route mentioned below and going to check if the response was successful or not
            const res = await api.post("api/token/refresh/",{
                refresh : refreshToken
            });
            if ( res.status === 200) { // 200 http response for a success
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthorized(true)
            } else {
                setAuthorized(false)
            }
        } catch(error) {
            console.log(error)
            setAuthorized(true)
        }
    };

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ;
        const now = Date.now()/1000;
        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setAuthorized(true)
        }
    };

    if(isAuthorized === null) {
        return <div>Loading...</div>
    }
    return  isAuthorized? children: <Navigate to = "/login"/>

}
export default ProtectedRoute