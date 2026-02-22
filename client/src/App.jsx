import { useState } from 'react';
import PersonaToggle from './components/PersonaToggle';
import VoiceAssistant from './components/VoiceAssistant';
import CallLog from './components/CallLog';

function App() {
  const [persona, setPersona] = useState('erp');
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/5 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">AI Voice Assistant</h1>
      <PersonaToggle onChange={setPersona} />
      <VoiceAssistant persona={persona} />
      <CallLog />
    </div>
  );
}

export default App;
