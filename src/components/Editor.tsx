import React, { ChangeEvent } from 'react';
import { useTheme } from '../config/ThemeContext';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const { theme } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Edit README</h2>
      <textarea
        value={value}
        onChange={handleChange}
        className={`w-full p-4 text-lg font-mono rounded-md border-2 ${
          theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
        }`}
        placeholder="Write your markdown here..."
        rows={10}
      />
    </div>
  );
};

export default Editor;
