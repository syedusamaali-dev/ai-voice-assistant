import { useEffect, useState } from 'react';

export default function CallLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/calls`)
      .then(r => r.json())
      .then(setLogs)
      .catch(console.error);
  }, []);

  return (
    <div className="mt-6 w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2">Call History</h2>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {logs.map((log) => (
          <li key={log._id} className="p-2 bg-gray-100 rounded">
            <div><strong>Persona:</strong> {log.persona}</div>
            <div><strong>Prompt:</strong> {log.prompt}</div>
            <div><strong>Response:</strong> {log.response}</div>
            <div className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
