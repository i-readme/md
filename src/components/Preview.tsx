import { useTheme } from '@config/ThemeContext';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const { theme } = useTheme();

  return (
   <div style={{ height: '100%', maxHeight: 'auto' }}
      className={`markdown-body w-full px-3 text-lg rounded-md border-2 ${
        theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
      }`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;
