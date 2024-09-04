"use client";

import Editor from '@components/Editor';
import Header from '@components/Header';
import TemplateList from '@components/List';
import Preview from '@components/Preview';
import { useTheme } from '@config/ThemeContext';
import { useEffect, useState } from 'react';

interface TemplateOption {
  label: string;
  content: string;
}

interface ReadmeTemplate {
  id: number;
  name: string;
  content: string;
  options: TemplateOption[];
}

export default function Home() {
  const [templates, setTemplates] = useState<ReadmeTemplate[]>([]);
  const [markdown, setMarkdown] = useState<string>('# Hello world');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [templateContent, setTemplateContent] = useState<{ [key: number]: string }>({});
  const [userEditedContent, setUserEditedContent] = useState<{ [key: number]: string }>({});

  const { theme } = useTheme();

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

  const updateMarkdown = (updatedTemplateContent: { [key: number]: string }) => {
    const newMarkdown = Object.values(updatedTemplateContent).join('\n\n');
    setMarkdown(newMarkdown);
  };

  const handleSelectTemplate = (templateId: number) => {
    const selected = templates.find((template) => template.id === templateId);
    if (selected) {
      const initialContent = selected.content;

      setTemplateContent((prev) => ({
        ...prev,
        [templateId]: initialContent,
      }));
      setUserEditedContent((prev) => ({
        ...prev,
        [templateId]: initialContent,
      }));

      setSelectedTemplateId(templateId);
      updateMarkdown({ ...templateContent, [templateId]: initialContent });
    }
  };

  const handleSelectOption = (optionLabel: string, templateId: number, optionContent: string) => {
    const updatedTemplateContent = {
      ...templateContent,
      [templateId]: optionContent,
    };
    setTemplateContent(updatedTemplateContent);
    updateMarkdown(updatedTemplateContent);

    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [templateId]: optionLabel,
    }));

    setUserEditedContent((prevUserEditedContent) => ({
      ...prevUserEditedContent,
      [templateId]: optionContent,
    }));
  };

  const handleDeleteTemplate = (templateId: number) => {
    if (window.confirm(`Are you sure you want to delete this template? This action cannot be undone.`)) {
      const updatedTemplates = templates.filter((template) => template.id !== templateId);
      setTemplates(updatedTemplates);

      const updatedTemplateContent = { ...templateContent };
      delete updatedTemplateContent[templateId];

      const updatedSelectedOption = { ...selectedOption };
      delete updatedSelectedOption[templateId];

      const updatedUserEditedContent = { ...userEditedContent };
      delete updatedUserEditedContent[templateId];

      setTemplateContent(updatedTemplateContent);
      setSelectedOption(updatedSelectedOption);
      setUserEditedContent(updatedUserEditedContent);

      if (selectedTemplateId === templateId) {
        setSelectedTemplateId(null);
        setMarkdown('# Hello world');
      } else {
        updateMarkdown(updatedTemplateContent);
      }
    }
  };

  const handleEditorChange = (newContent: string) => {
    setMarkdown(newContent);

    if (selectedTemplateId !== null) {
      setUserEditedContent((prevUserEditedContent) => ({
        ...prevUserEditedContent,
        [selectedTemplateId]: newContent,
      }));

      setTemplateContent((prevTemplateContent) => ({
        ...prevTemplateContent,
        [selectedTemplateId]: newContent,
      }));
    }
  };
  const handleResetEditor = () => {
    const confirmation = window.confirm('Are you sure you want to reset the editor? All unsaved changes will be lost.');
    if (confirmation) {
      setMarkdown('# Hello world');
      setSelectedTemplateId(null);
      setSelectedOption({});
      setTemplateContent({});
      setUserEditedContent({});
    }
  };

  return (
    <main className={theme}>
      <Header content={markdown} reset={handleResetEditor}/>

      <div style={{ display: 'flex', gap: '1rem', padding: '20px' }} className="flex min-h-screen flex-row justify-between">
        {/* TemplateList Component */}
        <TemplateList
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          selectedOption={selectedOption}
          handleSelectTemplate={handleSelectTemplate}
          handleSelectOption={handleSelectOption}
          handleDeleteTemplate={handleDeleteTemplate}
        />

        {/* Editor */}
        <div style={{ flex: 1 }}>
          <Editor value={markdown} onChange={handleEditorChange} />
        </div>

        {/* Preview */}
        <div style={{ flex: 1 }}>
          <Preview content={markdown} />
        </div>
      </div>
    </main>
  );
}
