import React, { useEffect } from 'react';
import ChatBot from 'react-chatbotify';

const ChadBot = ({ settings, flow }) => {


    useEffect(() => {
        //get flow from settings
    }, []);

    const themes = [
        {id: "minimal_midnight", version: "0.1.0"}
      ]

    return (
        <ChatBot settings={settings} themes={themes} flow={flow} />
    );
};

export default ChadBot;