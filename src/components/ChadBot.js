import React, { useEffect, useState } from 'react';
import ChatBot from 'react-chatbotify';
import { callLLM } from '../utils';

const ChadBot = ({ settings, flow }) => {
    const [completeFlow, setCompleteFlow] = useState(null);

    useEffect(() => {
        if (flow) {
            const newFlow = {
                ...flow,
                respondWithLLM: {
                    message: (params) => {
                        return callLLM(params.userInput);
                    },
                    path: "respondWithLLM"
                }
            };
            setCompleteFlow(newFlow);
        }
    }, [flow]);

    const themes = [
        {id: "minimal_midnight", version: "0.1.0"}
      ]

    if (!completeFlow) {
        return null;
    }

    return (
        <ChatBot settings={settings} themes={themes} flow={completeFlow} />

    );
};

export default ChadBot;