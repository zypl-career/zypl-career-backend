// partner.swagger.js
import { CreatePartnerDto, UpdatePartnerDto } from '../dto/index.js';

export const partnerSwagger = {
  create: {
    summary: {
      summary: 'Create a new partner',
    },
    body: {
      type: CreatePartnerDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Partner created successfully',
        schema: {
          example: {
            message: 'Partner created successfully',
          },
        },
      },
      conflict: {
        status: 302,
        description: 'Partner already exists',
        schema: {
          example: {
            statusCode: 302,
            message: 'Partner already exists',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            image: ['image must be a valid URL'],
          },
        },
      },
    },
  },
  getById: {
    summary: {
      summary: 'Get partner by ID',
    },
    param: {
      name: 'id',
      required: true,
      description: 'Partner ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Partner retrieved successfully',
        schema: {
          example: {
            id: '123',
            image: 'https://example.com/image1.jpg',
            createdAt: 1622548800000,
            deletedAt: 0,
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Partner not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Partner not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Bad request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid partner ID',
          },
        },
      },
    },
  },
  getAll: {
    summary: {
      summary: 'Get all partners with optional filters and pagination',
    },
    query: {
      page: {
        description: 'Page number for pagination',
        required: false,
        type: Number,
        example: 1,
      },
      limit: {
        description: 'Number of items per page',
        required: false,
        type: Number,
        example: 10,
      },
      title: {
        description: 'Filter by title (partial match)',
        required: false,
        type: String,
      },
      description: {
        description: 'Filter by description (partial match)',
        required: false,
        type: String,
      },
    },
    responses: {
      success: {
        status: 200,
        description: 'Partners retrieved successfully with pagination details',
        schema: {
          example: {
            total: 11,
            page: 1,
            limit: 10,
            data: [
              {
                id: '123',
                image: 'https://example.com/image1.jpg',
                createdAt: 1622548800000,
                deletedAt: 0,
              },
              {
                id: '124',
                image: 'https://example.com/image2.jpg',
                createdAt: 1622548800000,
                deletedAt: 0,
              },
            ],
          },
        },
      },
      notFound: {
        status: 404,
        description: 'No partners found matching the filters',
        schema: {
          example: {
            statusCode: 404,
            message: 'No partners found',
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update partner by ID',
    },
    param: {
      name: 'id',
      description: 'Partner ID',
    },
    body: {
      type: UpdatePartnerDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Partner updated successfully',
        schema: {
          example: {
            message: 'Partner updated successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Partner not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Partner not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            image: ['image must be a valid URL'],
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete partner by ID',
    },
    param: {
      name: 'id',
      description: 'Partner ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Partner deleted successfully',
        schema: {
          example: {
            message: 'Partner deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Partner not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Partner not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid partner ID'],
          },
        },
      },
    },
  },
};
