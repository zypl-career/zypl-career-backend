import {
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
  FilterSpecialtyDto,
} from '../dto/specialty.dto.js';

export const specialtySwagger = {
  create: {
    summary: {
      summary: 'Create a new specialty',
    },
    body: {
      type: CreateSpecialtyDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Specialty created successfully',
        schema: {
          example: {
            message: 'Specialty created successfully',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            // Other validation errors...
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get specialty by ID or all specialties',
    },
    param: {
      name: 'id',
      required: false,
      description: 'Specialty ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialty(s) retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              name: 'Specialty 1',
              // Other fields...
            },
            {
              id: '124',
              name: 'Specialty 2',
              // Other fields...
            },
          ],
        },
      },
      notFound: {
        status: 404,
        description: 'Specialty not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Specialty not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Bad request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid specialty ID',
          },
        },
      },
    },
  },
  filter: {
    summary: {
      summary: 'Filter specialties based on criteria',
    },
    query: {
      type: FilterSpecialtyDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Filtered specialties retrieved successfully',
        schema: {
          example: {
            data: [
              {
                id: '123',
                name: 'Specialty 1',
                // Other fields...
              },
              {
                id: '124',
                name: 'Specialty 2',
                // Other fields...
              },
            ],
            total: 2,
            page: 1,
            limit: 10,
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            // Other validation errors...
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update specialty by ID',
    },
    param: {
      name: 'id',
      description: 'Specialty ID',
    },
    body: {
      type: UpdateSpecialtyDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialty updated successfully',
        schema: {
          example: {
            message: 'Specialty updated successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Specialty not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Specialty not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            // Other validation errors...
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete specialty by ID',
    },
    param: {
      name: 'id',
      description: 'Specialty ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialty deleted successfully',
        schema: {
          example: {
            message: 'Specialty deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Specialty not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Specialty not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid specialty ID'],
          },
        },
      },
    },
  },
};
