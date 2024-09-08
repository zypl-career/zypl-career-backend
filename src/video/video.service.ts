import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideoService {
  private readonly videoDirectory = 'videos';

  constructor() {
    this.initializeVideoDirectory();
  }

  private async initializeVideoDirectory() {
    await fs.mkdir(this.videoDirectory, { recursive: true });
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  async uploadVideo(file: Express.Multer.File): Promise<string> {
    try {
      const filename = `${uuidv4()}-${file.originalname}`;
      const filePath = join(this.videoDirectory, filename);
      await fs.writeFile(filePath, file.buffer);
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
      const filePath = join(this.videoDirectory, filename);
      const fileBuffer = await fs.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error retrieving video from local storage', HttpStatus.NOT_FOUND);
    }
  }
}
