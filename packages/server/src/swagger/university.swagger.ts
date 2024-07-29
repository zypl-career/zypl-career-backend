import {
  CreateUniversityDto,
  UpdateUniversityDto,
} from '../dto/university.dto.js';

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
      success: {
        status: 200,
        description: 'University(s) retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              name: 'Harvard University',
              address: 'Cambridge, MA',
              contactEmail: 'info@harvard.edu',
              generalInfo: 'media/university-info/harvard.txt',
              createdAt: 1622548800000,
              updatedAt: 1622548800000,
            },
            {
              id: '124',
              name: 'Stanford University',
              address: 'Stanford, CA',
              contactEmail: 'info@stanford.edu',
              generalInfo: 'media/university-info/stanford.txt',
              createdAt: 1622548800000,
              updatedAt: 1622548800000,
            },
          ],
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
