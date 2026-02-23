import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load Gemini API key from environment (Vite exposes import.meta.env)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

function VoiceAssistant({ persona }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Initialize SpeechRecognition (Web Speech API) if available
  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.warn('SpeechRecognition not supported in this browser');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      handleUserMessage(spoken);
    };
    recognition.onend = () => setListening(false);

    const startListening = () => {
      setListening(true);
      recognition.start();
    };
    window.startVoiceListening = startListening; // expose for button click
    // cleanup
    return () => {
      recognition.stop();
    };
  }, []);

  const handleUserMessage = async (text) => {
    const userMsg = { role: 'user', parts: [{ text }] };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    try {
      const result = await model.generateContent(
        newMessages.map((m) => m.parts[0].text).join('\n')
      );
      const response = await result.response;
      const reply = response.text();
      setMessages((prev) => [...prev, { role: 'model', parts: [{ text: reply }] }]);
    } catch (e) {
      console.error('Gemini request failed', e);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-4 mt-6">
      <h2 className="text-xl font-semibold mb-2">Voice Assistant ({persona} mode)</h2>
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={() => window.startVoiceListening && window.startVoiceListening()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          disabled={listening}
        >
          {listening ? 'Listening...' : 'Start Listening'}
        </button>
        {transcript && <span className="italic text-gray-600">You said: {transcript}</span>}
      </div>
      <div className="h-48 overflow-y-auto border rounded p-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={msg.role === 'user' ? 'bg-primary text-white px-2 py-1 rounded' : 'bg-gray-200 text-gray-800 px-2 py-1 rounded'}>
              {msg.parts[0].text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoiceAssistant;
