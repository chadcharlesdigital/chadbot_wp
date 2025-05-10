import './App.css';
import ChadBot from './components/ChadBot';
import ChatBotSettings from './settings/ChatBotSettings';
import homeConversation from './flows/homeConversation';

function App() {
  return (
    <ChadBot settings={ChatBotSettings} flow={homeConversation} />
  );
}

export default App;
