import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import { ThemeProvider } from '../config/ThemeContext';

// Load Google Fonts using Next.js Font optimization
const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
