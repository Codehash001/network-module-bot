"use client"

import MainContent from '../components/ui/main-content';
import LeftSidebar from '../components/ui/sidebar/sidebar';

const ChatBotInterface: React.FC = () => {


  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <LeftSidebar/>
      
      {/* Main Content with Resizable Panels */}
    <MainContent/>
    </div>
  );
};

export default ChatBotInterface;