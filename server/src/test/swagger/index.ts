import { createTestModalDto, getTestDTO } from '../dto/index.js';

export const testSwagger = {
  process: {
    param: {
      name: 'authorization',
      required: false,
      description: 'The token',
    },
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
            message: 'Result modal processed successfully "with auth"',
            payload: {
              userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
              resultTest: [
                0.07961358152075046, 0.10572438850781071, 0.06472300693776838, 0.037430474967483834,
                0.7125085480661866,
              ],
              id: 'd6eb7edf-afd2-495c-98bc-617326fe7f31',
              createdAt: '2024-08-13T02:18:08.225Z',
              updatedAt: '2024-08-13T02:18:08.225Z',
              deletedAt: null,
            },

            without_auth: {
              message: 'Result modal processed successfully',
              info: 'This data not saved because user is not authenticated',
              payload: [
                0.07961358152075046, 0.10572438850781071, 0.06472300693776838, 0.037430474967483834,
                0.7125085480661866,
              ],
            },
          },
        },
      },

      success_without_auth: {
        status: 200,
        description: 'Result modal processed successfully',
        schema: {
          example: {
            message: 'Result modal processed successfully',
            info: 'This data not saved because user is not authenticated',
            payload: [
              0.07961358152075046, 0.10572438850781071, 0.06472300693776838, 0.037430474967483834,
              0.7125085480661866,
            ],
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
    param: {
      name: 'id',
      description: 'Test ID',
    },
    query: {
      type: getTestDTO,
    },

    responses: {
      success_id: {
        status: 200,
        description: 'get successfully',
        schema: {
          example: {
            id: '3a0a8292-9315-447b-86c6-e6201ad91bdf',
            userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
            resultTest: [
              '0.07961358152075046',
              '0.10572438850781071',
              '0.06472300693776838',
              '0.037430474967483834',
              '0.7125085480661866',
            ],
            createdAt: '2024-08-13T01:45:33.326Z',
            updatedAt: '2024-08-13T01:45:33.326Z',
            deletedAt: null,
          },
        },
      },

      success: {
        status: 200,
        description: 'get successfully',
        schema: {
          example: {
            total: 4,
            page: 1,
            limit: 10,
            data: [
              {
                id: '20f255d9-943b-4674-be2d-a636e5d3190b',
                userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
                resultTest: [
                  '0.07961358152075046',
                  '0.10572438850781071',
                  '0.06472300693776838',
                  '0.037430474967483834',
                  '0.7125085480661866',
                ],
                createdAt: '2024-08-13T01:45:40.793Z',
                updatedAt: '2024-08-13T01:45:40.793Z',
                deletedAt: null,
              },
              {
                id: 'afe864cd-b387-4d5e-9865-17e7ef300c4f',
                userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
                resultTest: [
                  '0.07961358152075046',
                  '0.10572438850781071',
                  '0.06472300693776838',
                  '0.037430474967483834',
                  '0.7125085480661866',
                ],
                createdAt: '2024-08-13T01:45:41.931Z',
                updatedAt: '2024-08-13T01:45:41.931Z',
                deletedAt: null,
              },
              {
                id: '8b767341-9cdd-4ef4-b95d-d1efd9d742e4',
                userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
                resultTest: [
                  '0.07961358152075046',
                  '0.10572438850781071',
                  '0.06472300693776838',
                  '0.037430474967483834',
                  '0.7125085480661866',
                ],
                createdAt: '2024-08-13T01:45:43.007Z',
                updatedAt: '2024-08-13T01:45:43.007Z',
                deletedAt: null,
              },
              {
                id: '21c4d0d3-86e2-49bd-803f-f701efa8d309',
                userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
                resultTest: [
                  '0.07961358152075046',
                  '0.10572438850781071',
                  '0.06472300693776838',
                  '0.037430474967483834',
                  '0.7125085480661866',
                ],
                createdAt: '2024-08-13T01:45:44.120Z',
                updatedAt: '2024-08-13T01:45:44.120Z',
                deletedAt: null,
              },
              {
                id: 'c88f891f-1fc8-41fa-9e4b-1444e2f1c392',
                userId: '5492d4f7-72df-4ef7-8640-7ad3448e32a3',
                resultTest: [
                  '0.07961358152075046',
                  '0.10572438850781071',
                  '0.06472300693776838',
                  '0.037430474967483834',
                  '0.7125085480661866',
                ],
                createdAt: '2024-08-13T01:45:45.868Z',
                updatedAt: '2024-08-13T01:45:45.868Z',
                deletedAt: null,
              },
            ],
          },
        },
      },
    },
  },
  export: {
    summary: 'Export all data to an Excel file',
    responses: {
      success: {
        status: 200,
        description: 'Excel file successfully generated',
      },
      error: {
        status: 500,
        description: 'Internal server error occurred while generating Excel file',
      },
    },
  },
};
