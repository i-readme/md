interface SaveButtonProps {
  content: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ content }) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return <button onClick={handleDownload}>Download README.md</button>;
};

export default SaveButton;
