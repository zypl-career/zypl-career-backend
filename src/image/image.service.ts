import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  private readonly imagePath = 'images';

  constructor() {
    this.initializeImagePath();
  }

  private async initializeImagePath() {
    await fs.mkdir(this.imagePath, { recursive: true });
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const filename = `${uuidv4()}-${file.originalname}`;
      const filePath = join(this.imagePath, filename);
      await fs.writeFile(filePath, file.buffer);
      return filename;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading file to local storage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async getImage(filename: string): Promise<Buffer> {
    try {
      const filePath = join(this.imagePath, filename);
      const fileBuffer = await fs.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error retrieving file from local storage', HttpStatus.NOT_FOUND);
    }
  }
}
