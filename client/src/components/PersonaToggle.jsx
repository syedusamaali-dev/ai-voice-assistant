import { useState } from 'react';

export default function PersonaToggle({ onChange }) {
  const [persona, setPersona] = useState('ERP');

  const handleSelect = (p) => {
    setPersona(p);
    if (onChange) onChange(p);
  };

  return (
    <div className="flex gap-2 mb-4 justify-center">
      <button
        type="button"
        className={`px-4 py-2 rounded transition-colors ${persona === 'ERP' ? 'bg-primary text-white' : 'bg-white/20 text-primary hover:bg-primary/10'}`}
        onClick={() => handleSelect('ERP')}
      >
        ERP
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded transition-colors ${persona === 'Banking' ? 'bg-primary text-white' : 'bg-white/20 text-primary hover:bg-primary/10'}`}
        onClick={() => handleSelect('Banking')}
      >
        Banking
      </button>
    </div>
  );
}
