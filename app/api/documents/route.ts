// app/api/documents/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const fileNames = await fs.readdir(dataDirectory);

    const documents = await Promise.all(fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.(pdf|docx|txt)$/, '');
      const type = fileName.split('.').pop() as 'pdf' | 'docx' | 'txt';
      const stats = await fs.stat(path.join(dataDirectory, fileName));
      return {
        id,
        name: fileName,
        path: `/data/${fileName}`,
        type,
        size: stats.size,
        createdAt: stats.birthtime,
      };
    }));

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error reading documents:', error);
    return NextResponse.json({ error: 'Failed to read documents' }, { status: 500 });
  }
}

