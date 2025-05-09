import logo from './logo.svg';
import './App.css';
import ChadBot from './components/ChadBot';
import ChatBotSettings from './settings/ChatBotSettings';
import mainConversation from './flows/mainConversation';

function App() {
  return (
    <ChadBot settings={ChatBotSettings} flow={mainConversation} />
  );
}

export default App;
