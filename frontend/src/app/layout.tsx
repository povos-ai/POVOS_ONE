import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import WorkspaceSwitcher from '@/components/WorkspaceSwitcher';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'], 
  subsets: ['latin'], 
  variable: '--font-poppins' 
});

export const metadata = {
  title: 'POVOS ONE - AI Powered Opportunity Intelligence',
  description: 'Discover opportunities that match your future.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter">
        <WorkspaceProvider>
          {/* Navbar with Workspace Switcher */}
          <nav className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-blue-600">POVOS ONE</h1>
                <WorkspaceSwitcher />
              </div>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-gray-600 hover:text-blue-600 text-sm">
                  Dashboard
                </a>
                <a href="/opportunities" className="text-gray-600 hover:text-blue-600 text-sm">
                  Opportunities
                </a>
                <a href="/profile" className="text-gray-600 hover:text-blue-600 text-sm">
                  Profile
                </a>
              </div>
            </div>
          </nav>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </WorkspaceProvider>
      </body>
    </html>
  );
}