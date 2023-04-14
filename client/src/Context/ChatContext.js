import { createContext,useState} from 'react'

export const ChatContext = createContext(null)

export default function Context({children}){
    const [chat, setChat] = useState()

    return(
        <ChatContext.Provider value={{chat,setChat}}>
        {children}
        </ChatContext.Provider>
    )
}