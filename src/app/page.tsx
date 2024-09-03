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
  name: string;
  content: string;
  options: TemplateOption[];
}

export default function Home() {
  const [templates, setTemplates] = useState<ReadmeTemplate[]>([]);
  const [markdown, setMarkdown] = useState<string>('# Hello world');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<{ [key: string]: string }>({});
  const [templateContent, setTemplateContent] = useState<{ [key: string]: string }>({});
  const [originalTemplateContent, setOriginalTemplateContent] = useState<{ [key: string]: string }>({});
  const [userEditedContent, setUserEditedContent] = useState<{ [key: string]: string }>({});

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

  const updateMarkdown = (updatedTemplateContent: { [key: string]: string }) => {
    const newMarkdown = Object.values(updatedTemplateContent).join('\n\n');
    setMarkdown(newMarkdown);
  };

  const handleSelectTemplate = (templateName: string) => {
    const selected = templates.find((template) => template.name === templateName);
    if (selected) {
      const initialContent = selected.content;

      setOriginalTemplateContent((prev) => ({
        ...prev,
        [templateName]: initialContent,
      }));

      setTemplateContent((prev) => ({
        ...prev,
        [templateName]: initialContent,
      }));
      setUserEditedContent((prev) => ({
        ...prev,
        [templateName]: initialContent,
      }));

      setSelectedTemplate(templateName);
      updateMarkdown({ ...templateContent, [templateName]: initialContent });
    }
  };

  const handleSelectOption = (optionLabel: string, templateName: string, optionContent: string) => {
    const updatedTemplateContent = {
      ...templateContent,
      [templateName]: optionContent,
    };
    setTemplateContent(updatedTemplateContent);
    updateMarkdown(updatedTemplateContent);

    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [templateName]: optionLabel,
    }));

    setUserEditedContent((prevUserEditedContent) => ({
      ...prevUserEditedContent,
      [templateName]: optionContent,
    }));
  };

  const handleDeleteTemplate = (templateName: string) => {
    if (window.confirm(`Are you sure you want to delete the template "${templateName}"? This action cannot be undone.`)) {
      const updatedTemplateContent = { ...templateContent };
      delete updatedTemplateContent[templateName];

      const updatedSelectedOption = { ...selectedOption };
      delete updatedSelectedOption[templateName];

      const updatedUserEditedContent = { ...userEditedContent };
      delete updatedUserEditedContent[templateName];

      const updatedOriginalTemplateContent = { ...originalTemplateContent };
      delete updatedOriginalTemplateContent[templateName];

      setTemplateContent(updatedTemplateContent);
      setSelectedOption(updatedSelectedOption);
      setUserEditedContent(updatedUserEditedContent);
      setOriginalTemplateContent(updatedOriginalTemplateContent);

      updateMarkdown(updatedTemplateContent);
    }
  };

  const handleResetTemplate = (templateName: string) => {
    const originalContent = originalTemplateContent[templateName];

    if (originalContent) {
      const updatedTemplateContent = {
        ...templateContent,
        [templateName]: originalContent,
      };
      setTemplateContent(updatedTemplateContent);
      setUserEditedContent((prev) => ({
        ...prev,
        [templateName]: originalContent,
      }));
      updateMarkdown(updatedTemplateContent);
    }
  };

  const handleEditorChange = (newContent: string) => {
    setMarkdown(newContent);

    if (selectedTemplate) {
      setUserEditedContent((prevUserEditedContent) => ({
        ...prevUserEditedContent,
        [selectedTemplate]: newContent,
      }));

      setTemplateContent((prevTemplateContent) => ({
        ...prevTemplateContent,
        [selectedTemplate]: newContent,
      }));
    }
  };

  const handleResetEditor = () => {
    const confirmation = window.confirm('Are you sure you want to reset the editor? All unsaved changes will be lost.');
    if (confirmation) {
      setMarkdown('# Hello world');
      setSelectedTemplate('');
      setSelectedOption({});
      setTemplateContent({});
      setUserEditedContent({});
      setOriginalTemplateContent({});
    }
  };

  return (
    <main  className={theme}>
      <Header content={markdown} reset={handleResetEditor}/>

      <div style={{ display: 'flex', gap: '1rem', padding: '20px' }}>
        {/* TemplateList Component */}
        <TemplateList
          templates={templates}
          selectedTemplate={selectedTemplate}
          selectedOption={selectedOption}
          handleSelectTemplate={handleSelectTemplate}
          handleSelectOption={handleSelectOption}
          handleDeleteTemplate={handleDeleteTemplate}
          handleResetTemplate={handleResetTemplate}
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
