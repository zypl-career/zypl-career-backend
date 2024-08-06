import { UserEntity } from '../_db/entity/user.entity.js';
import {
  CreateUserDto,
  LoginUserDto,
  PaginationDto,
  UpdateUserDto,
} from '../dto/user.dto.js';

export const userSwagger = {
  register: {
    summary: {
      summary: 'Register a new user',
    },
    body: {
      type: CreateUserDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'User registered successfully',
        schema: {
          example: {
            message: 'User registered successfully',
            payload: {
              surname: 'XXXX',
              patronymic: 'XXX',
              gender: 'male',
              age: 25,
              district: 'XX',
              role: 'student',
              school: 'XX XX',
              email: 'XXXXX@XX.XX',
              name: 'XXX',
              id: 'UUID',
              createdAt: '2024-08-06T10:23:47.803Z',
              updatedAt: '2024-08-06T10:23:47.803Z',
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
            surname: ['surname must be a string'],
            gender: ['gender must be either male or female'],
            role: ['role must be either student, teacher, or parents'],
            email: ['email must be a valid email address'],
            password: [
              'password must be between 8 and 20 characters',
              'password must be a string',
            ],
            name: ['name must be a string'],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get user by ID or all users',
    },
    param: {
      name: 'id',
      required: false,
      description: 'User ID',
    },
    query: {
      name: 'pagination',
      type: PaginationDto,
    },
    filters: {
      surname: {
        description: 'Filter by surname (like search)',
        type: 'string',
        required: false,
      },
      patronymic: {
        description: 'Filter by patronymic (like search)',
        type: 'string',
        required: false,
      },
      gender: {
        description: 'Filter by gender',
        type: 'string',
        enum: ['male', 'female'],
        required: false,
      },
      age: {
        description: 'Filter by age',
        type: 'number',
        required: false,
      },
      district: {
        description: 'Filter by district (like search)',
        type: 'string',
        required: false,
      },
      role: {
        description: 'Filter by role',
        type: 'string',
        enum: ['student', 'teacher', 'parent'],
        required: false,
      },
      school: {
        description: 'Filter by school',
        type: 'string',
        required: false,
      },
      email: {
        description: 'Filter by email',
        type: 'string',
        required: false,
      },
      name: {
        description: 'Filter by name (like search)',
        type: 'string',
        required: false,
      },
    },
    responses: {
      success: {
        status: 200,
        description: 'User(s) retrieved successfully',
        schema: {
          example: {
            items: [
              // user objects
            ],
            meta: {
              totalItems: 100,
              itemCount: 10,
              itemsPerPage: 10,
              totalPages: 10,
              currentPage: 1,
            },
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
        description: 'Bad request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid user ID',
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
      type: UpdateUserDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'User updated successfully',
        schema: {
          example: {
            message: 'User updated successfully',
            payload: {
              surname: 'XXXX',
              patronymic: 'XXX',
              gender: 'male',
              age: 25,
              district: 'XX',
              role: 'student',
              school: 'XX XX',
              email: 'XXXXX@XX.XX',
              name: 'XXX',
              id: 'UUID',
              createdAt: '2024-08-06T10:23:47.803Z',
              updatedAt: '2024-08-06T10:23:47.803Z',
            },
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
            surname: ['surname must be a string'],
            gender: ['gender must be either male or female'],
            role: ['role must be either student, teacher, or parents'],
            email: ['email must be a valid email address'],
            password: [
              'password must be between 8 and 20 characters',
              'password must be a string',
            ],
            name: ['name must be a string'],
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
  login: {
    summary: {
      summary: 'User login',
    },
    body: {
      type: LoginUserDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'User logged in successfully',
        schema: {
          example: {
            access: 'your_jwt_token',
            refresh: 'your_refresh_token',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Login failed',
        schema: {
          example: {
            email: ['email must be a valid email address'],
            password: ['password must be a string'],
          },
        },
      },
    },
  },
};
