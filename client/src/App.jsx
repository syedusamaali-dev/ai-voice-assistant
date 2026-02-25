import { useState } from 'react';
import PersonaToggle from './components/PersonaToggle';
import VoiceAssistant from './components/VoiceAssistant';
import CallLog from './components/CallLog';

function App() {
  const [persona, setPersona] = useState('erp');
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-8 flex flex-col items-center glass max-w-2xl mx-auto my-12 space-y-6">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">Welcome to My Portfolio</h1>
      <p className="text-lg text-white/90 mb-4">Explore the projects below and have fun!</p>
      <PersonaToggle onChange={setPersona} />
      <VoiceAssistant persona={persona} />
      <CallLog />
    </div>
  );
}

export default App;
