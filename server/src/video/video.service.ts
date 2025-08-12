import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideoService {
  private mediaPath: string = path.join(process.cwd(), 'media', 'video');

  constructor() {
    // Ensure media directory exists
    if (!fs.existsSync(this.mediaPath)) {
      fs.mkdirSync(this.mediaPath, { recursive: true });
    }
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  async uploadVideo(file: Express.Multer.File): Promise<string> {
    try {
      const filename = `${uuidv4()}-${file.originalname}`;
      const filePath = path.join(this.mediaPath, filename);

      // Write file to local storage
      await fs.promises.writeFile(filePath, file.buffer);
      
      return filename;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading video to local storage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async getVideo(filename: string): Promise<Buffer> {
    try {
      const filePath = path.join(this.mediaPath, filename);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
      }

      // Read file from local storage
      const fileBuffer = await fs.promises.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error retrieving video from local storage',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
