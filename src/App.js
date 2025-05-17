import './App.css';
import ChadBot from './components/ChadBot';
import ChatBotSettings from './settings/ChatBotSettings';
import homeConversation from './flows/homeConversation';
import buildWebsiteConversation from './flows/buildWebsiteConversation';
import { useState, useEffect } from 'react';
function App() {

  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const getLastUrlSegment = () => {
      const path = window.location.pathname;
      const segments = path.split('/').filter(segment => segment.length > 0);
      return segments[segments.length - 1] || '';
    };
    const lastSegment = getLastUrlSegment();

    if (lastSegment === 'websites' || lastSegment === 'websites-2') {
      setFlow(buildWebsiteConversation);
    }else{
      setFlow(homeConversation);
    }
  }, []);

  return (
    <ChadBot settings={ChatBotSettings} flow={flow} />
  );
}

export default App;
