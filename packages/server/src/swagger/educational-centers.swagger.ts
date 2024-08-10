import {
  CreateEducationCenterDto,
  UpdateEducationCenterDto,
} from '../dto/educational-centers.dto.js';

export const educationCenterSwagger = {
  create: {
    summary: {
      summary: 'Create a new education center',
    },
    body: {
      type: CreateEducationCenterDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Education center created successfully',
        schema: {
          example: {
            message: 'Education center created successfully',
            payload: {
              id: 'UUID',
              title: 'Title',
              image: 'image url',
              generalInfo: 'info general ',
              city: 'city',
              createdAt: '2024-08-10T11:50:48.555Z',
              updatedAt: '2024-08-10T11:50:48.555Z',
              deletedAt: null,
            },
          },
        },
      },
      conflict: {
        status: 302,
        description: 'Education center already exists',
        schema: {
          example: {
            statusCode: 302,
            message: 'Education center already exists',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            title: ['Title must be a string'],
            image: ['Image is required'],
            generalInfo: ['General info is required'],
            city: ['City is required'],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get education center by ID',
    },
    param: {
      name: 'id',
      description: 'Education center ID',
    },
    responses: {
      successId: {
        status: 200,
        description: 'Education center retrieved successfully',
        schema: {
          example: {
            id: 'UUID',
            title: 'Name',
            city: 'city',
            image: 'image url',
            generalInfo: 'General info',
            createdAt: '2024-08-10T10:55:58.855Z',
            updatedAt: '2024-08-10T10:55:58.855Z',
            deletedAt: null,
          },
        },
      },
      success: {
        status: 200,
        description: 'Education center retrieved successfully',
        schema: {
          example: {
            total: 6,
            page: '1',
            limit: '10',
            data: [
              {
                id: 'UUID',
                image: 'image url',
                title: 'title',
                generalInfoFile: 'url general info file',
                city: 'city',
                createdAt: '2024-08-10T10:55:58.855Z',
                updatedAt: '2024-08-10T10:55:58.855Z',
                deletedAt: null,
              },
            ],
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Education center not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Education center not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Invalid education center ID',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid education center ID',
          },
        },
      },
    },
  },
  getAll: {
    summary: {
      summary: 'Get all education centers or filter by city',
    },
    query: {
      name: 'city',
      required: false,
      description: 'Filter by city',
    },
    responses: {
      success: {
        status: 200,
        description: 'Education centers retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              title: 'Education Center Title',
              image: 'https://example.com/image.jpg',
              generalInfoFile:
                'media/education-center-info/education-center.txt',
              city: 'City Name',
              createdAt: 1622548800000,
              updatedAt: 1622548800000,
            },
          ],
        },
      },
      notFound: {
        status: 404,
        description: 'Education centers not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Education centers not found',
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update education center by ID',
    },
    param: {
      name: 'id',
      description: 'Education center ID',
    },
    body: {
      type: UpdateEducationCenterDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Education center updated successfully',
        schema: {
          example: {
            message: 'Education center updated successfully',
            payload: {
              id: 'UUID',
              title: 'Title',
              image: 'image url',
              generalInfo: 'info general ',
              city: 'city',
              createdAt: '2024-08-10T11:50:48.555Z',
              updatedAt: '2024-08-10T11:50:48.555Z',
              deletedAt: null,
            },
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Education center not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Education center not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            title: ['Title must be a string'],
            image: ['Image must be a valid URL'],
            generalInfo: ['General info must be a string'],
            city: ['City must be a string'],
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete education center by ID',
    },
    param: {
      name: 'id',
      description: 'Education center ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Education center deleted successfully',
        schema: {
          example: {
            message: 'Education center deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Education center not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Education center not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid education center ID'],
          },
        },
      },
    },
  },
};
