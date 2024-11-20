import { Controller, Get, HttpException, HttpStatus, Param, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { TxtService } from './txt.service.js';

@ApiTags('txt')
@Controller('/txt')
export class TxtController {
  constructor(private readonly txtService: TxtService) {}

  @Post('/upload')
  @ApiOperation({ summary: 'Upload a TXT file content to Google Cloud Storage' })
  @ApiResponse({ status: 201, description: 'TXT file uploaded successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async uploadTxt(@Body('content') content: string): Promise<{ id: string }> {
    if (!content) {
      throw new HttpException('Content is required', HttpStatus.BAD_REQUEST);
    }

    const id = await this.txtService.uploadTxt(content);
    return { id };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a TXT file content by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the TXT file', type: String })
  @ApiResponse({ status: 200, description: 'TXT file retrieved successfully' })
  @ApiResponse({ status: 404, description: 'TXT file not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTxt(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const content = await this.txtService.getTxt(id);
    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `inline; filename=${id}.txt`,
    });
    res.status(HttpStatus.OK).send(content);
  }
}
