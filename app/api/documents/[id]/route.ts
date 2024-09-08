// app/api/documents/[id]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const dataDirectory = path.join(process.cwd(), 'data');
  
  try {
    const files = await fs.readdir(dataDirectory);
    const file = files.find(f => f.startsWith(id));
    
    if (!file) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const filePath = path.join(dataDirectory, file);
    const fileContents = await fs.readFile(filePath);
    const fileType = path.extname(file).slice(1);

    return new NextResponse(fileContents, {
      headers: {
        'Content-Type': fileType === 'pdf' ? 'application/pdf' : 
                        fileType === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 
                        'text/plain',
        'Content-Disposition': `inline; filename="${file}"`,
      },
    });
  } catch (error) {
    console.error('Error reading document:', error);
    return NextResponse.json({ error: 'Failed to read document' }, { status: 500 });
  }
}