import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  private storage: Storage;
  private bucketName: string = 'kasbiman_backets';

  constructor() {
    this.storage = new Storage();
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const filename = `${uuidv4()}-${file.originalname}`;
      const bucket = this.storage.bucket(this.bucketName);
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });

      blobStream.end(file.buffer);

      return new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
          const publicUrl = `${filename}`;
          resolve(publicUrl);
        });

        blobStream.on('error', (error) => {
          console.error(error);
          reject(
            new HttpException(
              'Error uploading file to Google Cloud Storage',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        });
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading file to Google Cloud Storage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async getImage(filename: string): Promise<Buffer> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(filename);

      const [exists] = await file.exists();
      if (!exists) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      const [fileBuffer] = await file.download();
      return fileBuffer;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error retrieving file from Google Cloud Storage',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
