import { useTheme } from '@config/ThemeContext'; // Adjust the import path as necessary


interface TemplateOption {
  label: string;
  content: string;
}

interface ReadmeTemplate {
  name: string;
  content: string;
  options: TemplateOption[];
}

interface TemplateListProps {
  templates: ReadmeTemplate[];
  selectedTemplate: string;
  selectedOption: { [key: string]: string };
  handleSelectTemplate: (templateName: string) => void;
  handleSelectOption: (optionLabel: string, templateName: string, optionContent: string) => void;
  handleDeleteTemplate: (templateName: string) => void;
  handleResetTemplate: (templateName: string) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  selectedTemplate,
  selectedOption,
  handleSelectTemplate,
  handleSelectOption,
  handleDeleteTemplate,
  handleResetTemplate,
}) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div style={{ flex: 1, maxWidth: '250px', overflowY: 'auto' }} className={theme}>
      <ul className="px-4">
        {templates.map((template) => (
          <li
            key={template.name}
            style={{
              marginBottom: '20px',
              color: theme === 'light' ? '#000' : '#fff',
            }}
          >
            <span
              onClick={() => handleSelectTemplate(template.name)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedTemplate === template.name ? 'bold' : 'normal',
              }}
            >
              {template.name}
            </span>

            {selectedTemplate === template.name && (
              <>
                <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                  {template.options.map((option) => (
                    <li
                      key={option.label}
                      style={{
                        marginBottom: '10px',
                        color: theme === 'light' ? '#000555' : '#fff',
                      }}
                    >
                      <label style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={`option-${template.name}`}
                          value={option.label}
                          checked={selectedOption[template.name] === option.label}
                          onChange={() => handleSelectOption(option.label, template.name, option.content)}
                          style={{ marginRight: '10px' }}
                        />
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>

                {selectedOption[template.name] && (
                  <div style={{ marginTop: '10px' }}>
                    <button
                      onClick={() => handleDeleteTemplate(template.name)}
                      style={{ marginRight: '10px' }}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      Delete Template
                    </button>
                    <button
                      onClick={() => handleResetTemplate(template.name)}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      Reset Template
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
