import { ThemeProvider } from '@config/ThemeContext';
import '@styles/globals.css';

export const metadata = {
  title: 'Readme',
  description: 'Readme.md playground',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
