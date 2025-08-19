import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
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

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  @Post('upload')
  @ApiOperation({ summary: 'Upload a PDF file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The PDF file to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The filename of the uploaded PDF',
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({ status: 500, description: 'Error uploading PDF' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const result = await this.pdfService.uploadPdf(file);
    if (typeof result === 'string') {
      return result;
    } else if ((result as IError).error) {
      throw new HttpException((result as IError).error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new HttpException('Unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
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
