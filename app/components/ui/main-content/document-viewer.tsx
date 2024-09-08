import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';

  
  interface DocumentViewerProps {
    fileUrl: string;
    fileType: string;
    fileName: string;
  }
  
  const DocumentViewer: React.FC<DocumentViewerProps> = ({ fileUrl, fileType, fileName }) => {
    const [content, setContent] = useState<string>('');
    const [numPages, setNumPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const setupPdfWorker = async () => {
          const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
          pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
        };
        setupPdfWorker();
      }, []);

  useEffect(() => {
    fetchDocument();
  }, [fileUrl, fileType]);

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const response = await fetch(fileUrl);
      if (fileType === 'pdf') {
        // For PDFs, we don't need to fetch content here as react-pdf will handle it
        setLoading(false);
        return;
      }
      const blob = await response.blob();
      if (fileType === 'docx') {
        const arrayBuffer = await blob.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setContent(result.value);
      } else {
        // Assume it's a text file
        const text = await blob.text();
        setContent(text);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      setContent('Error loading document.');
    }
    setLoading(false);
  };

  const highlightText = useCallback((text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileType !== 'pdf') {
      const highlightedContent = highlightText(content, searchTerm);
      setContent(highlightedContent);
    }
    // For PDFs, the search is handled by react-pdf
  };

  const renderContent = () => {
    if (loading) {
      return <Loader2 className="h-8 w-8 animate-spin" />;
    }

    switch (fileType) {
      case 'pdf':
        return (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<Loader2 className="h-8 w-8 animate-spin" />}
          >
            <Page 
              pageNumber={currentPage} 
              renderTextLayer={true}
              renderAnnotationLayer={false}
            />
          </Document>
        );
      case 'docx':
      case 'txt':
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search in document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="flex-grow overflow-auto">
        {renderContent()}
      </div>
      {fileType === 'pdf' && (
        <div className="mt-4 flex justify-between items-center">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {numPages}</span>
          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages))}
            disabled={currentPage >= numPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;