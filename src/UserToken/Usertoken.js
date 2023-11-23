import { createContext, useState } from "react";


export let UserToken = createContext();


export default function CreateContextProvider(props){

const [userToken, setUserToken] = useState(null);

return <UserToken.Provider value={{setUserToken,userToken}}>
    {props.children}
</UserToken.Provider>

}


