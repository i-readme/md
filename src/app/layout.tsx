import { ThemeProvider } from '@config/ThemeContext';
import '@styles/globals.css';
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: 'Readme',
  description: 'Readme.md playground',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
