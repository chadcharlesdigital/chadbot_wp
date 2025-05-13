import { useMessages } from "react-chatbotify";
import { useEffect } from "react";

function MessageHistory( { updateChatHistory, currentChatHistory } ) {
    const { messages } = useMessages();
    useEffect(() => {
        if (currentChatHistory.current.length !== messages.length) {
        updateChatHistory(messages);
        }
    }, [messages]);

}

export default MessageHistory;