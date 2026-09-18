// app/layout.tsx
import '98.css/dist/98.css';
import './globals.css';
import { WindowManagerProvider } from '../context/WindowManagerContext';
import { DesktopSettingsProvider } from '@/context/DesktopSettingsContext';
import { Reenie_Beanie } from 'next/font/google';

const handwriting = Reenie_Beanie({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-handwriting',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={handwriting.variable}>
      <body>
        <DesktopSettingsProvider>
          <WindowManagerProvider>{children}</WindowManagerProvider>
        </DesktopSettingsProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'RexOS 98',
  description: 'A retro Windows 98 portfolio',
};

