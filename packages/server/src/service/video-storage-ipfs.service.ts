import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnixFS, unixfs } from '@helia/unixfs';
import { createHelia, HeliaLibp2p } from 'helia';
import { CID } from 'multiformats/cid';
import { Config } from '../app/config.app.js';

@Injectable()
export class VideoStorageIPFSService {
  private helia: HeliaLibp2p;
  private fs: UnixFS;

  constructor() {
    this.initializeHelia();
  }

  private async initializeHelia() {
    this.helia = await createHelia();
    this.fs = unixfs(this.helia);
  }

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  async uploadVideo(file: Express.Multer.File): Promise<string> {
    try {
      const result = await this.fs.addBytes(file.buffer);
      return Config.domain + '/videos/play/' + result.toString();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error uploading file to IPFS using Helia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async getVideo(cid: CID): Promise<Buffer> {
    try {
      const stream = this.fs.cat(cid);
      const downloaded = await this.streamToBuffer(stream);
      return downloaded;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error retrieving file from IPFS using Helia',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // CONVERT STREAM TO BUFFER
  // ---------------------------------------------------------------------------
  private async streamToBuffer(
    readableStream: AsyncIterable<Uint8Array>,
  ): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of readableStream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}
