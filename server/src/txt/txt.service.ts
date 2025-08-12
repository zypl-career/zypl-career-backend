import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TxtService {
  private mediaPath: string = path.join(process.cwd(), 'media', 'txt');

  constructor() {
    // Ensure media directory exists
    if (!fs.existsSync(this.mediaPath)) {
      fs.mkdirSync(this.mediaPath, { recursive: true });
    }
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  public async uploadTxt(content: string): Promise<string> {
    try {
      const filename = `file_${uuidv4()}.txt`;
      const filePath = path.join(this.mediaPath, filename);

      // Write file to local storage
      await fs.promises.writeFile(filePath, content, 'utf-8');
      
      return filename;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading TXT to local storage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  public async getTxt(id: string): Promise<string> {
    try {
      const filePath = path.join(this.mediaPath, id);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new HttpException('TXT file not found', HttpStatus.NOT_FOUND);
      }

      // Read file from local storage
      const content = await fs.promises.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Error retrieving TXT from local storage: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
