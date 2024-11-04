import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

import { IError, IValidation } from '../type/base.js';

@Injectable()
export class PdfService {
  private storage: Storage;
  private bucketName: string = 'kasbiman_backets';

  constructor() {
    this.storage = new Storage();
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  public async uploadPdf(file: Express.Multer.File): Promise<string | IError> {
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
          resolve(filename);
        });

        blobStream.on('error', (error) => {
          console.error(error);
          reject({
            error: 'Error uploading PDF to Google Cloud Storage',
          });
        });
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading PDF to Google Cloud Storage',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  public async getPdf(id: string): Promise<Buffer | IError | IValidation> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(`${id}`);
      const [exists] = await file.exists();
      if (!exists) {
        return { error: 'PDF file not found' };
      }

      const [fileBuffer] = await file.download();
      return fileBuffer;
    } catch (error) {
      console.error(error);
      return { error: `Error retrieving PDF from Google Cloud Storage: ${error.message}` };
    }
  }
}
