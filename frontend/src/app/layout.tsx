// src/app/layout.tsx
import '../../globals.css'; // based on your structure

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Blog Platform',
  description: 'A personal blog built with Next.js and Node.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
