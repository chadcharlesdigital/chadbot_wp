import React, { useEffect, useState, useRef } from 'react';
import ChatBot from 'react-chatbotify';
import { callLLM, formatChatHistory } from '../utils';
import CurrentChatHistory from './CurrentChatHistory';
import {ChatBotProvider} from 'react-chatbotify';

const ChadBot = ({ settings, flow }) => {
    const [completeFlow, setCompleteFlow] = useState(null);
    const currentChatHistory = useRef([]);

      // Update function to pass to child
      const updateChatHistory = (messages) => {
        currentChatHistory.current = messages;
        console.log("Chat history updated from parent component:", currentChatHistory.current);
    };

    //appends the call lllm function to the flow.
    useEffect(() => {
        if (flow) {
            const newFlow = {
                ...flow,
                respondWithLLM: {
                    message: (params) => {
                        //turn the history array into a string this contains the most recent question as well
                        const promptWithHistory = formatChatHistory(currentChatHistory.current);
                        // console.log("complete prompt", completePrompt);
                        return callLLM(promptWithHistory);
                    },
                    path: "respondWithLLM"
                }
            };
            setCompleteFlow(newFlow);
        }
    }, [flow]);

    //to add more themes just copy and pase them in
    const themes = [
        {id: "minimal_midnight", version: "0.1.0"}
      ]

    if (!completeFlow) {
        return null;
    }

    return (
        <ChatBotProvider>
            <CurrentChatHistory currentChatHistory={currentChatHistory} updateChatHistory={updateChatHistory} />
        <ChatBot settings={settings} themes={themes} flow={completeFlow} />
        </ChatBotProvider>

    );
};

export default ChadBot;