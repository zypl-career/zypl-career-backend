import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

import { IError, IValidation } from '../type/base.js';

@Injectable()
export class PdfService {
  private mediaPath: string = path.join(process.cwd(), 'media', 'pdf');

  constructor() {
    // Ensure media directory exists
    if (!fs.existsSync(this.mediaPath)) {
      fs.mkdirSync(this.mediaPath, { recursive: true });
    }
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  public async uploadPdf(file: Express.Multer.File): Promise<string | IError> {
    try {
      const filename = `${uuidv4()}-${file.originalname}`;
      const filePath = path.join(this.mediaPath, filename);

      // Write file to local storage
      await fs.promises.writeFile(filePath, file.buffer);
      
      return filename;
    } catch (error) {
      console.error(error);
      return {
        error: 'Error uploading PDF to local storage',
      };
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  public async getPdf(id: string): Promise<Buffer | IError | IValidation> {
    try {
      const filePath = path.join(this.mediaPath, id);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return { error: 'PDF file not found' };
      }

      // Read file from local storage
      const fileBuffer = await fs.promises.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      console.error(error);
      return { error: `Error retrieving PDF from local storage: ${error.message}` };
    }
  }
}
