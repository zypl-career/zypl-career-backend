import { CreateUserFastDto, GetUserFastDto, UpdateUserFastDto } from '../dto/index.js';

export const userSwagger = {
  create: {
    summary: {
      summary: 'Create a new user',
    },
    body: {
      type: CreateUserFastDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'User created successfully',
        schema: {
          example: {
            message: 'User created successfully',
            payload: {
              gender: 'female',
              role: 'student',
              age: 22,
            },
          },
        },
      },
      conflict: {
        status: 409,
        description: 'User already exists',
        schema: {
          example: {
            statusCode: 409,
            message: 'User already exists',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['Name is required'],
            surname: ['Surname is required'],
            email: ['Email must be a valid email'],
            password: ['Password is required'],
            role: ['Role must be either student, teacher, or parents'],
          },
        },
      },
    },
  },

  get: {
    summary: {
      summary: 'Get user by ID',
    },
    param: {
      name: 'id',
      description: 'User ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'User retrieved successfully',
        schema: {
          example: {
            id: '123',
            gender: 'male',
            age: 30,
            district: 'Dushanbe',
            createdAt: 1622548800000,
            updatedAt: 1622548800000,
          },
        },
      },
      notFound: {
        status: 404,
        description: 'User not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'User not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Invalid user ID',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid user ID',
          },
        },
      },
    },
  },

  getAll: {
    summary: {
      summary: 'Get all users or filter by various criteria with pagination',
    },
    query: GetUserFastDto,
    responses: {
      success: {
        status: 200,
        description: 'Users retrieved successfully',
        schema: {
          example: {
            total: 100,
            page: 1,
            limit: 10,
            data: [
              {
                gender: 'male',
                age: 30,
                district: 'Dushanbe',
                createdAt: 1622548800000,
                updatedAt: 1622548800000,
              },
            ],
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Users not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Users not found',
          },
        },
      },
    },
  },

  update: {
    summary: {
      summary: 'Update user by ID',
    },
    param: {
      name: 'id',
      description: 'User ID',
    },
    body: {
      type: UpdateUserFastDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'User updated successfully',
        schema: {
          example: {
            message: 'User updated successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'User not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'User not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['Name must be a string'],
            email: ['Email must be a valid email'],
            role: ['Role must be either student, teacher, or parents'],
          },
        },
      },
    },
  },

  delete: {
    summary: {
      summary: 'Delete user by ID',
    },
    param: {
      name: 'id',
      description: 'User ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'User deleted successfully',
        schema: {
          example: {
            message: 'User deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'User not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'User not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid user ID'],
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
