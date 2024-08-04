import { Injectable } from '@nestjs/common';
import { ResultModalDto } from '../dto/test.dto.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { convertData } from '../util/test.js';
import { Config } from '../app/config.app.js';

@Injectable()
export class ResultModalService {
  async handleResultModal(
    requestData: ResultModalDto,
  ): Promise<IMessage | IValidation | IError> {
    try {
      const data = convertData(requestData);
      console.log(data);

      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch(Config.modelAPI, options);
      console.log('response', response);

      const jsonResponse = await response.json();

      console.log('JSON response', jsonResponse);

      if (response.status !== 200) {
        return {
          error: response.statusText,
        };
      }

      return {
        message: 'Result modal processed successfully',
      };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
