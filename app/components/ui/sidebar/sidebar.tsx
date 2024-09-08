import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, LogOut, Image as ImageIcon,  PanelRightOpen,  } from 'lucide-react';


export default function LeftSidebar() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
    return(
        <div className={`${leftSidebarOpen ? 'w-64' : 'w-16'} bg-shamrock-800 dark:bg-shamrock-950 px-2 pb-4 pt-2 flex flex-col transition-all duration-300 ease-in-out shadow-lg rounded-r-xl`}>
        <div className='flex justify-between items-center mb-6'>
          {leftSidebarOpen && <h1 className="text-lg font-bold text-shamrock-100">Chat history</h1>}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-shamrock-100 hover:bg-shamrock-700"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          >
            {leftSidebarOpen ? <PanelRightOpen className="h-6 w-6" /> : <PanelRightOpen className="h-6 w-6 rotate-180" />}
          </Button>
        </div>

        {leftSidebarOpen && (
          <>
            <Button className="bg-shamrock-600 hover:bg-shamrock-500 text-shamrock-50 mb-6 transition-all duration-300 ease-in-out transform hover:scale-105">New chat</Button>
            <div className="space-y-2 text-shamrock-100">
              <Button variant="ghost" className="w-full justify-start hover:bg-shamrock-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Feedback
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-shamrock-700">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
            <div className="mt-auto">
              <Card className="bg-shamrock-700 dark:bg-shamrock-800 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                      <AvatarFallback>AW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-shamrock-100 text-sm font-medium">Adam Williams</p>
                      <p className="text-shamrock-300 text-xs">Demo user</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    )
}