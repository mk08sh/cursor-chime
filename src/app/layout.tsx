import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cursor Chime - Task Completion Sounds',
  description: 'An interactive web application that demonstrates notification sound concepts using different musical motifs for task and project completion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
