import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { IError, IValidation } from '../types/_index.js';
import { validateUUID } from '../util/utils.js';

@Injectable()
export class PdfService {
  #mediaPath = './media/lessons';

  private async findPdfFilePath(
    id: string,
  ): Promise<{ file: string } | IError> {
    const filePath = join(this.#mediaPath, `${id}.pdf`);
    try {
      await fs.access(filePath);
      return { file: filePath };
    } catch (err) {
      return { error: 'PDF file not found' };
    }
  }

  public async getPdf(id: string): Promise<Buffer | IError | IValidation> {
    if (!validateUUID(id)) {
      return { validation: 'Invalid file ID' };
    }

    const filePath = await this.findPdfFilePath(id);
    if ('error' in filePath) return filePath;

    try {
      const pdfData = await fs.readFile(filePath.file);
      return pdfData;
    } catch (err) {
      return { error: 'Error reading PDF file' };
    }
  }
}
