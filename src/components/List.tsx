import { useTheme } from '@config/ThemeContext';
import DeleteIcon from '@icons/delete.svg';

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

interface TemplateListProps {
  templates: ReadmeTemplate[];
  selectedTemplateId: number | null;
  selectedOption: { [key: number]: string };
  handleSelectTemplate: (templateId: number) => void;
  handleSelectOption: (optionLabel: string, templateId: number, optionContent: string) => void;
  handleDeleteTemplate: (templateId: number) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  selectedTemplateId,
  selectedOption,
  handleSelectTemplate,
  handleSelectOption,
  handleDeleteTemplate,
}) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div style={{ flex: 1, maxWidth: '250px', overflowY: 'auto' }} className={theme}>
      <ul className="px-4">
        {templates.map((template) => (
          <li
            key={template.id}
            style={{
              marginBottom: '20px',
              color: theme === 'light' ? '#000f99' : '#fff',
            }}
          >
            <span
              onClick={() => handleSelectTemplate(template.id)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedTemplateId === template.id ? 'bold' : 'normal',
              }}
            >
              <span className="flex flex-row items-center justify-between">
                <>{template.name}</>
                <>
                  {selectedOption[template.id] && (
                    <div style={{ marginTop: '10px', marginRight: '10px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering the selection when clicking delete
                          handleDeleteTemplate(template.id);
                        }}
                        style={{ marginRight: '10px' }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </>
              </span>
            </span>

            {selectedTemplateId === template.id && (
              <>
                <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                  {template.options.map((option) => (
                    <li
                      key={option.label}
                      style={{
                        marginBottom: '10px',
                        color: theme === 'light' ? '#000785' : '#fff',
                      }}
                    >
                      <label style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={`option-${template.id}`}
                          value={option.label}
                          checked={selectedOption[template.id] === option.label}
                          onChange={() => handleSelectOption(option.label, template.id, option.content)}
                          style={{ marginRight: '10px' }}
                        />
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
