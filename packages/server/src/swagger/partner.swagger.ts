import { CreatePartnerDto, UpdatePartnerDto } from '../dto/partner.dto.js';

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
  get: {
    summary: {
      summary: 'Get partner by ID or all partners',
    },
    param: {
      name: 'id',
      required: false,
      description: 'Partner ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Partner(s) retrieved successfully',
        schema: {
          example: [
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
