import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* Floating Draft Notice */}
      <div className="draft-notice">
        <div className="draft-notice-content">
          <div className="font-bold">DRAFT</div>
          <div className="text-sm">For RFI Discussion and Feedback Purposes Only</div>
          <div className="text-xs mt-1">Content does not reflect final decisions or Minnesota procurement direction</div>
        </div>
      </div>
      <main className="flex-grow relative" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;