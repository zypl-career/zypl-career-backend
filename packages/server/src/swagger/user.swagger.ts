import { UserEntity } from '../_db/entity/user.entity.js';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto.js';

export const userSwagger = {
  create: {
    summary: {
      summary: 'Create a new user',
    },
    body: {
      type: CreateUserDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'User created successfully',
        schema: {
          example: {
            message: 'User created successfully',
            payload: {
              name: 'name',
              surname: 'surname',
              gender: 'female',
              role: 'student',
              email: 'email@email.email',
              password: '****secret****',
              patronymic: 'patronymic',
              age: 22,
              district: 'district',
              school: 'school',
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
            name: 'John',
            surname: 'Doe',
            patronymic: 'Middle',
            gender: 'male',
            age: 30,
            district: 'Dushanbe',
            role: 'student',
            school: 'High School',
            email: 'john.doe@example.com',
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
    query: [
      {
        name: 'name',
        required: false,
        description: 'Filter by name (partial match)',
        type: String,
      },
      {
        name: 'surname',
        required: false,
        description: 'Filter by surname (partial match)',
        type: String,
      },
      {
        name: 'gender',
        required: false,
        description: 'Filter by gender',
        type: String,
        enum: ['male', 'female'],
      },
      {
        name: 'age',
        required: false,
        description: 'Filter by age',
        type: Number,
      },
      {
        name: 'district',
        required: false,
        description: 'Filter by district',
        type: String,
      },
      {
        name: 'role',
        required: false,
        description: 'Filter by role',
        type: String,
        enum: ['student', 'teacher', 'parents'],
      },
      {
        name: 'email',
        required: false,
        description: 'Filter by email (partial match)',
        type: String,
      },
      {
        name: 'page',
        required: false,
        description: 'Page number for pagination',
        type: Number,
        example: 1,
      },
      {
        name: 'limit',
        required: false,
        description: 'Number of items per page',
        type: Number,
        example: 10,
      },
    ],
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
                id: '123',
                name: 'John',
                surname: 'Doe',
                patronymic: 'Middle',
                gender: 'male',
                age: 30,
                district: 'Dushanbe',
                role: 'student',
                school: 'High School',
                email: 'john.doe@example.com',
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
