import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <h2>Edit README</h2>
      <TextareaAutosize
        minRows={10}
        value={value}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          fontFamily: 'monospace',
        }}
        placeholder="Write your markdown here..."
      />
    </div>
  );
};

export default Editor;
