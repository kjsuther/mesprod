import { createWorker } from 'tesseract.js';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

export interface ProcessedDocument {
  text: string;
  metadata?: {
    pageCount?: number;
    author?: string;
    title?: string;
    [key: string]: any;
  };
}

export const SUPPORTED_FILE_TYPES = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
};

export const getSupportedExtensions = (): string[] => {
  return Object.values(SUPPORTED_FILE_TYPES).flat();
};

export const isSupportedFileType = (filename: string): boolean => {
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return getSupportedExtensions().includes(extension);
};

export const getFileType = (filename: string): string => {
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));

  for (const [mimeType, extensions] of Object.entries(SUPPORTED_FILE_TYPES)) {
    if (extensions.includes(extension)) {
      return mimeType;
    }
  }

  return 'application/octet-stream';
};

const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to extract text from image');
  }
};

const extractTextFromWord = async (file: File): Promise<string> => {
  try {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value || '';
  } catch (error) {
    console.error('Error extracting text from Word document:', error);
    throw new Error('Failed to extract text from Word document');
  }
};

const extractTextFromExcel = async (file: File): Promise<string> => {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    let text = '';

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      text += `Sheet: ${sheetName}\n`;
      text += XLSX.utils.sheet_to_txt(worksheet, { FS: ' | ' });
      text += '\n\n';
    });

    return text;
  } catch (error) {
    console.error('Error extracting text from Excel document:', error);
    throw new Error('Failed to extract text from Excel document');
  }
};

const extractTextFromPlainText = async (file: File): Promise<string> => {
  try {
    return await file.text();
  } catch (error) {
    console.error('Error reading text file:', error);
    throw new Error('Failed to read text file');
  }
};

export const processDocument = async (file: File): Promise<ProcessedDocument> => {
  const fileType = getFileType(file.name);

  let text = '';
  const metadata: any = {
    filename: file.name,
    fileSize: file.size,
    fileType: fileType,
  };

  try {
    if (fileType === 'text/plain' || fileType === 'text/markdown') {
      text = await extractTextFromPlainText(file);
    } else if (fileType.startsWith('image/')) {
      text = await extractTextFromImage(file);
    } else if (fileType.includes('wordprocessingml')) {
      text = await extractTextFromWord(file);
    } else if (fileType.includes('spreadsheetml') || fileType.includes('ms-excel')) {
      text = await extractTextFromExcel(file);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    if (!text || text.trim().length === 0) {
      throw new Error('No text could be extracted from the document');
    }

    return { text, metadata };
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
};

export const calculateFileHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};
