import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Save, Heart, Clock, LogOut, Search, Mic, Image as ImageIcon, Send, ChevronLeft, ChevronRight, Menu, GripVertical, PanelRightClose, PanelRightOpen, FileText, ChevronDown } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DarkModeToggle from '../darkModeToggle';
import { useEffect, useState } from "react";
import Header from "../../header";
import ChatSection from "../../chat-section";
import DocumentViewer from "./document-viewer";
import { DocumentPreview } from "../document-preview";
import { DocumentFileData } from "../chat";

interface Document {
    id: number;
    name: string;
    type: string;
  }

export default function MainContent(data:DocumentFileData) {

  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      } else {
        console.error('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return(
        <div className='flex flex-col items-center justify-center w-full h-full px-4 pb-4'>
            <Header/>
        <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-lg border border-shamrock-200 dark:border-shamrock-700 overflow-hidden">
          {/* Chat Window */}
          <ResizablePanel defaultSize={75} minSize={50} maxSize={80} className="flex flex-col bg-white dark:bg-shamrock-800">
            {/* <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-end mb-4">
                <Card className="bg-shamrock-100 dark:bg-shamrock-700 max-w-[80%] shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <p className="font-semibold text-shamrock-900 dark:text-shamrock-100">Tell me about Design Thinking.</p>
                      </div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button variant="ghost" size="sm"><Clock className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><MessageCircle className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-start mb-4">
                <Card className="bg-shamrock-200 dark:bg-shamrock-600 max-w-[80%] shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="Bot avatar" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-shamrock-900 dark:text-shamrock-100">Design Thinking is a problem-solving approach that emphasizes empathy, creativity, and collaboration. It involves understanding the needs and perspectives of users, generating innovative ideas, and rapidly prototyping and testing solutions.</p>
                      </div>
                    </div>
                    <div className="flex justify-start space-x-2 mt-2">
                      <Button variant="ghost" size="sm"><ThumbsUp className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><MessageCircle className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Clock className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-shamrock-800 rounded-xl p-2 shadow-lg border">
                <Input placeholder="Ask Me anything ..." className="flex-1 border-none bg-transparent" />
                <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><ImageIcon className="h-5 w-5" /></Button>
                <Button className="bg-shamrock-500 hover:bg-shamrock-400 text-white rounded-xl"><Send className="h-5 w-5" /></Button>
              </div>
            </div> */}
            <ChatSection/>
          </ResizablePanel>

          <ResizableHandle className="relative">
            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <GripVertical className="h-6 w-6 text-shamrock-400" />
            </div>
          </ResizableHandle>

          {/* Document Viewer (Right Sidebar) */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="bg-shamrock-50 dark:bg-shamrock-900">
      <div className="h-full flex flex-col p-4">
        <div className="relative mb-4">
          <Input 
            placeholder="Search documents" 
            className="pl-10 bg-white dark:bg-shamrock-800 border-shamrock-200 dark:border-shamrock-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-shamrock-400" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full mb-4 flex justify-between items-center">
              <span>{selectedDocument ? selectedDocument.name : 'Select Document'}</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100%-2rem)]">
            {filteredDocuments.map((doc) => (
              <DropdownMenuItem key={doc.id} onSelect={() => setSelectedDocument(doc)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>{doc.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedDocument && (
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-4 h-full">
              <h3 className="text-lg font-semibold mb-2">{selectedDocument.name}</h3>
              <div className="bg-white dark:bg-shamrock-800 rounded-lg p-4 h-[calc(100%-2rem)] overflow-auto">
              {data.files.map((file) => (
        <DocumentPreview key={file.id} file={file} />
      ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
}