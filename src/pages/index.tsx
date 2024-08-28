import React, { useEffect, useState } from 'react';
import Download from '../components/DownloadButton';
import Editor from '../components/Editor';
import Preview from '../components/Preview';

interface ReadmeTemplate {
  name: string;
  content: string;
}

export default function Home() {
  const [templates, setTemplates] = useState<ReadmeTemplate[]>([]);
  const [markdown, setMarkdown] = useState<string>('# Hello world');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // Fetch templates from public folder client-side
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/config/template.json'); // Fetch from public folder
        if (!res.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await res.json();
        setTemplates(data.templates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleSelectTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const template = templates.find((t) => t.name === e.target.value);
    if (template) {
      setMarkdown(template.content);
      setSelectedTemplate(template.name);
    }
  };

  const handleResetEditor = () => {
    const confirmation = window.confirm('Are you sure you want to reset the editor? All unsaved changes will be lost.');
    if (confirmation) {
      setMarkdown('');
      setSelectedTemplate('');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1>README Editor and Previewer</h1>

      {/* Dropdown for Selecting Templates */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="template-select">Choose a README template: </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={handleSelectTemplate}
          style={{ padding: '10px', marginLeft: '10px' }}
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option key={template.name} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
        <button onClick={handleResetEditor} style={{ marginLeft: '20px' }}>
          Reset Editor
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <Editor value={markdown} onChange={setMarkdown} />
        </div>
        <div style={{ flex: 1 }}>
          <Preview content={markdown} />
        </div>
      </div>

      <Download content={markdown} />
    </div>
  );
}
