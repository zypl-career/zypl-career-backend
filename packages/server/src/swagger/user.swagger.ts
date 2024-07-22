import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto.js';

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
          },
        },
      },
      conflict: {
        status: 302,
        description: 'User already exists',
        schema: {
          example: {
            statusCode: 302,
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
    responses: {
      success: {
        status: 200,
        description: 'User(s) retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              name: 'John',
              surname: 'Doe',
              patronymic: 'Smith',
              gender: 'male',
              age: 20,
              district: 'District 1',
              role: 'student',
              school: 'High School #1',
              email: 'john.doe@example.com',
              password: 'hashedpassword',
              createdAt: 1622548800000,
              deletedAt: 0,
            },
            {
              id: '124',
              name: 'Jane',
              surname: 'Smith',
              gender: 'female',
              role: 'teacher',
              email: 'jane.smith@example.com',
              password: 'hashedpassword',
              createdAt: 1622548800000,
              deletedAt: 0,
            },
          ],
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
