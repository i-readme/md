import { useTheme } from '@config/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className={theme}>
      <div className="bg-gray-50">
        {/* Main Content */}
        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <nav className="relative flex items-center justify-between md:justify-start" aria-label="Global">
              <Link href="/">
                <img
                  className="w-auto h-12 cursor-pointer"
                  src="/logo.png"
                  alt="readme.io logo"
                />
              </Link>
            </nav>
          </div>

          <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">title</span>
                <span className="block text-emerald-500">readme</span>
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                description
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <div className="flex flex-col items-center">
                <span className="inline-flex rounded-md shadow ">
                  <Link href="/playground" className="inline-flex items-center px-4 py-2 font-medium text-xl bg-emerald-500 hover:bg-emerald-400 border border-transparent rounded-lg text-white w-[250px] h-[54px] justify-center">
                    get-started
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center mt-3">
              <a
                className="group inline-flex items-center px-4 py-2 text-sm bg-gray-50 border rounded-lg text-gray-500 w-[116px] h-[35px] justify-center transition-colors hover:bg-gray-100"
                aria-label="Sponsor octokatherine"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/sponsors/octokatherine"
              >
                <img
                  className="w-4 h-4 mr-3 transform transition-transform group-hover:scale-110"
                  src="heart.svg"
                  alt="sponsorship heart"
                />
                Sponsor
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="flex-1 w-full bg-gray-800" />
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <Image
                className="relative rounded-lg shadow-lg"
                src="/screenshot.png"
                alt="App screenshot"
                height={700}
                width={1200}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold tracking-wide text-center text-gray-400">
              made-with-love&#9825'by'{' '}
              <a
                className="hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/katherinecodes"
              >
                Katherine Oelsner
              </a>
            </h2>
            <div className="flex justify-center mt-4">
              <a
                href="https://github.com/octokatherine/readme.so"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github logo"
              >
                <img className="w-auto h-6" src="github.svg" alt="github logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
