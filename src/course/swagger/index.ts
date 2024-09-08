import { CreateCourseDto } from '../dto/create.js';
import { UpdateCourseDto } from '../dto/update.js';

export const courseSwagger = {
  create: {
    summary: {
      summary: 'Create a new course',
    },
    body: {
      type: CreateCourseDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Course created successfully',
        schema: {
          example: {
            message: 'Course created successfully',
            payload: {
              id: 'UUID',
              title: 'Course Title',
              description: 'Course Description',
              image: 'https://example.com/image.jpg',
              tags: ['tag1', 'tag2'],
              finishedPercentage: 75,
              createdAt: '2024-08-18T10:26:19.373Z',
              updatedAt: '2024-08-18T10:26:19.373Z',
              deletedAt: null,
            },
          },
        },
      },
      conflict: {
        status: 302,
        description: 'Course already exists',
        schema: {
          example: {
            statusCode: 302,
            message: 'Course already exists',
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
            description: ['Description is required'],
            tags: ['Tags must be an array'],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get course by ID',
    },
    param: {
      name: 'id',
      description: 'Course ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Course retrieved successfully',
        schema: {
          example: {
            id: '123',
            title: 'Course Title',
            image: 'https://example.com/image.jpg',
            description: 'This is a description of the course.',
            tags: ['tag1', 'tag2'],
            finishedPercentage: 50,
            createdAt: '2024-08-18T10:26:19.373Z',
            updatedAt: '2024-08-18T10:26:19.373Z',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Course not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Course not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Invalid course ID',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid course ID',
          },
        },
      },
    },
  },
  getAll: {
    summary: {
      summary: 'Get all courses or filter by various criteria with pagination',
    },
    query: [
      {
        name: 'title',
        required: false,
        description: 'Filter by title (partial match)',
        type: String,
      },
      {
        name: 'description',
        required: false,
        description: 'Filter by description (partial match)',
        type: String,
      },
      {
        name: 'finishedPercentage',
        required: false,
        description: 'Filter by finished percentage',
        type: Number,
      },
      {
        name: 'tags',
        required: false,
        description: 'Filter by tags',
        type: String,
        isArray: true,
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
        description: 'Courses retrieved successfully',
        schema: {
          example: {
            total: 100,
            page: 1,
            limit: 10,
            data: [
              {
                id: '123',
                title: 'Course Title',
                image: 'https://example.com/image.jpg',
                description: 'This is a description of the course.',
                tags: ['tag1', 'tag2'],
                finishedPercentage: 50,
                createdAt: '2024-08-18T10:26:19.373Z',
                updatedAt: '2024-08-18T10:26:19.373Z',
              },
            ],
          },
        },
      },
      notFound: {
        status: 404,
        description: 'No courses found',
        schema: {
          example: {
            statusCode: 404,
            message: 'No courses found',
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update course details',
    },
    param: {
      name: 'id',
      description: 'Course ID',
    },
    body: {
      type: UpdateCourseDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Course updated successfully',
        schema: {
          example: {
            message: 'Course updated successfully',
            payload: {
              id: 'UUID',
              title: 'Updated Course Title',
              description: 'Updated Course Description',
              image: 'https://example.com/new-image.jpg',
              tags: ['newTag1', 'newTag2'],
              finishedPercentage: 80,
              createdAt: '2024-08-18T10:26:19.373Z',
              updatedAt: '2024-08-18T10:26:19.373Z',
              deletedAt: null,
            },
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Course not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Course not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            title: ['Title must be a string'],
            description: ['Description is required'],
            tags: ['Tags must be an array'],
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete a course by ID',
    },
    param: {
      name: 'id',
      description: 'Course ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Course deleted successfully',
        schema: {
          example: {
            message: 'Course deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Course not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Course not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid ID format'],
          },
        },
      },
    },
  },
};
