import DownloadIcon from '@icons/download.svg';

interface DownloadProps {
  content: string;
}

const Download: React.FC<DownloadProps> = ({ content }) => {
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

  return <button onClick={handleDownload} ><DownloadIcon/></button>;
};

export default Download;
