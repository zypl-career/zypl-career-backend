import { createTestModalDto } from '../dto/test.dto.js';

export const resultModalSwagger = {
  process: {
    summary: {
      summary: 'Process result modal',
    },
    body: {
      type: createTestModalDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Result modal processed successfully',
        schema: {
          example: {
            message: 'Result modal processed successfully',
            payload: {
              /* Your payload example here */
            },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Invalid or missing token',
        schema: {
          example: {
            statusCode: 401,
            message: 'Invalid token',
          },
        },
      },
      error: {
        status: 500,
        description: 'Internal server error',
        schema: {
          example: {
            statusCode: 500,
            message: 'Error message',
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Process result modal',
    },
  },
};
