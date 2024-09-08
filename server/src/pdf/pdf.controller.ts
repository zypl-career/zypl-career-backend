import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { IError, IValidation } from '../type/base.js';

import { PdfService } from './pdf.service.js';

@ApiTags('pdf')
@Controller('/pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  private handleServiceResult(result: any, res: Response, id: string) {
    if (result instanceof Buffer) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${id}.pdf`,
      });
      return res.status(HttpStatus.OK).send(result);
    } else if ((result as IValidation).validation) {
      throw new HttpException((result as IValidation).validation, HttpStatus.BAD_REQUEST);
    } else if ((result as IError).error) {
      throw new HttpException((result as IError).error, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Retrieve and display a PDF file by ID in the browser',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier for the PDF file',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The PDF file was retrieved successfully and will be displayed in the browser',
    content: { 'application/pdf': {} },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file ID',
  })
  @ApiResponse({
    status: 404,
    description: 'PDF file not found',
  })
  async getPdf(@Param('id') id: string, @Res() res: Response) {
    const result = await this.pdfService.getPdf(id);
    return this.handleServiceResult(result, res, id);
  }
}
