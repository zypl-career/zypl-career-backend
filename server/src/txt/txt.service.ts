import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TxtService {
  private storage: Storage;
  private bucketName: string = 'kasbiman_backets';

  constructor() {
    this.storage = new Storage();
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  public async uploadTxt(content: string): Promise<string> {
    try {
      const filename = `file_${uuidv4()}.txt`;
      const bucket = this.storage.bucket(this.bucketName);
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: 'text/plain',
      });

      blobStream.end(content);

      return new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
          resolve(filename);
        });

        blobStream.on('error', (error) => {
          console.error(error);
          reject(new HttpException('Error uploading TXT to Google Cloud Storage', HttpStatus.INTERNAL_SERVER_ERROR));
        });
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading TXT to Google Cloud Storage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  public async getTxt(id: string): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(id);
      const [exists] = await file.exists();
      if (!exists) {
        throw new HttpException('TXT file not found', HttpStatus.NOT_FOUND);
      }

      const [content] = await file.download();
      return content.toString('utf-8');
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Error retrieving TXT from Google Cloud Storage: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
