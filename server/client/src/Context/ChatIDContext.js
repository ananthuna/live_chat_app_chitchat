import { createContext,useState} from 'react'

export const ChatIDContext = createContext(null)

export default function Context({children}){
    const [chatID, setChatID] = useState(null)
    const [chatURL,setChatURL]=useState(null)

    return(
        <ChatIDContext.Provider value={{chatID,setChatID,chatURL,setChatURL}}>
        {children}
        </ChatIDContext.Provider>
    )
}