import { CreateUniversityDto, UpdateUniversityDto } from '../dto/index.js';

export const universitySwagger = {
  create: {
    summary: {
      summary: 'Create a new university',
    },
    body: {
      type: CreateUniversityDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'University registered successfully',
        schema: {
          example: {
            message: 'University registered successfully',
            payload: {
              id: 'UUID',
              name: 'Name university',
              city: 'CITY',
              generalInfo: 'General Information',
              createdAt: '2024-08-09T07:55:23.499Z',
              updatedAt: '2024-08-09T07:55:23.499Z',
              deletedAt: null,
            },
          },
        },
      },
      conflict: {
        status: 302,
        description: 'University already exists',
        schema: {
          example: {
            statusCode: 302,
            message: 'University already exists',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            address: ['address must be a string'],
            contactEmail: ['contactEmail must be a valid email address'],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get university by ID or all universities',
    },
    param: {
      name: 'id',
      required: false,
      description: 'University ID',
    },
    responses: {
      successId: {
        status: 200,
        description: 'University(s) retrieved successfully',
        schema: {
          example: {
            id: 'UUID',
            name: 'Tajik National University',
            city: 'Dushanbe',
            generalInfo: 'General Information',
            createdAt: '2024-08-09T07:47:51.792Z',
            updatedAt: '2024-08-09T07:47:51.792Z',
            deletedAt: null,
          },
        },
      },
      success: {
        status: 200,
        description: 'University(s) retrieved successfully',
        schema: {
          example: {
            total: 3,
            page: '1',
            limit: '10',
            data: [
              {
                id: 'UUID',
                name: 'Tajik National University',
                city: 'Dushanbe',
                generalInfo: 'General Information',
                createdAt: '2024-08-09T07:47:51.792Z',
                updatedAt: '2024-08-09T07:47:51.792Z',
                deletedAt: null,
              },
              {
                id: 'UUID',
                name: 'Tajik National University 1',
                city: 'Dushanbe',
                generalInfo: 'General Information',
                createdAt: '2024-08-09T07:47:51.792Z',
                updatedAt: '2024-08-09T07:47:51.792Z',
                deletedAt: null,
              },
            ],
          },
        },
      },
      notFound: {
        status: 404,
        description: 'University not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'University not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Bad request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid university ID',
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update university by ID',
    },
    param: {
      name: 'id',
      description: 'University ID',
    },
    body: {
      type: UpdateUniversityDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'University updated successfully',
        schema: {
          example: {
            message: 'University updated successfully',
            payload: {
              id: 'UUID',
              name: 'Name university',
              city: 'CITY',
              generalInfo: 'General Information',
              createdAt: '2024-08-09T07:55:23.499Z',
              updatedAt: '2024-08-09T07:55:23.499Z',
              deletedAt: null,
            },
          },
        },
      },
      notFound: {
        status: 404,
        description: 'University not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'University not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            address: ['address must be a string'],
            contactEmail: ['contactEmail must be a valid email address'],
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete university by ID',
    },
    param: {
      name: 'id',
      description: 'University ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'University deleted successfully',
        schema: {
          example: {
            message: 'University deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'University not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'University not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid university ID'],
          },
        },
      },
    },
  },
};
