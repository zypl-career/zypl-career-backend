import { google, youtube_v3 } from 'googleapis';
import { Readable } from 'stream';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class VideoStorageService {
  private youtube: youtube_v3.Youtube;
  private oauth2Client: OAuth2Client;

  constructor() {
    this.initializeYouTube();
  }

  private initializeYouTube() {
    // Initialize OAuth2Client with your credentials
    this.oauth2Client = new google.auth.OAuth2(
      '601557939255-rb7snc2tt86tadj9m9r0jtb9msf0udaf.apps.googleusercontent.com',
      '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',
      'http://localhost:8000',
    );

    // Set the refresh token
    this.oauth2Client.setCredentials({
      refresh_token:
        '1//0cqPC9pdD_gpCCgYIARAAGAwSNwF-L9IrYhidDhq_GGr5jzlC34YS3FWV8gbkl5WdbnzP4DsMprGp-lK9UyuYEZFJHHQcvaoPuNA',
    });

    // Initialize YouTube API with the authenticated client
    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  async uploadVideo(
    file: Express.Multer.File,
    title: string,
    description: string,
  ): Promise<{ youtubeUrl: string }> {
    try {
      const youtubeUrl = await this.uploadToYouTube(file, title, description);
      return { youtubeUrl };
    } catch (error) {
      console.error('Error during video upload:', error);
      throw new HttpException(
        'Error uploading video to YouTube',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async uploadToYouTube(
    file: Express.Multer.File,
    title: string,
    description: string,
  ): Promise<string> {
    try {
      // Create a readable stream from the buffer
      const videoStream = Readable.from(file.buffer);

      const res = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title,
            description,
          },
          status: {
            privacyStatus: 'private',
          },
        },
        media: {
          body: videoStream, // Use the stream
        },
      });

      return `https://www.youtube.com/watch?v=${res.data.id}`;
    } catch (error) {
      console.error('Error during YouTube API request:', error);
      throw new HttpException(
        'Error uploading video to YouTube',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
