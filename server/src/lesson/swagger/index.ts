import { CreateLessonDto, UpdateLessonDto } from '../dto/index.js';

export const lessonSwagger = {
  create: {
    summary: {
      summary: 'Create a new lesson',
    },
    body: {
      type: CreateLessonDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Lesson created successfully',
        schema: {
          example: {
            message: 'Lesson created successfully',
            payload: {
              id: 'UUID',
              name: 'Lesson Name',
              description: 'Lesson Description',
              resource: 'https://example.com/resource.mp4',
              courseId: 'UUID',
              status: 'in_progress',
              createdAt: '2024-08-18T10:26:19.373Z',
              updatedAt: '2024-08-18T10:26:19.373Z',
              deletedAt: null,
            },
          },
        },
      },
      conflict: {
        status: 302,
        description: 'Lesson already exists',
        schema: {
          example: {
            statusCode: 302,
            message: 'Lesson already exists',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['Name must be a string'],
            resource: ['Resource is required'],
            courseId: ['Course ID is required'],
            status: ['Status is required'],
          },
        },
      },
    },
  },

  get: {
    summary: {
      summary: 'Get lesson by ID',
    },
    param: {
      name: 'id',
      description: 'Lesson ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Lesson retrieved successfully',
        schema: {
          example: {
            id: '123',
            name: 'Lesson Name',
            description: 'Lesson Description',
            resource: 'https://example.com/resource.mp4',
            courseId: 'UUID',
            status: 'in_progress',
            createdAt: '2024-08-18T10:26:19.373Z',
            updatedAt: '2024-08-18T10:26:19.373Z',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Lesson not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Lesson not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Invalid lesson ID',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid lesson ID',
          },
        },
      },
    },
  },

  getAll: {
    summary: {
      summary: 'Get all lessons or filter by various criteria with pagination',
    },
    query: [
      {
        name: 'name',
        required: false,
        description: 'Filter by name (partial match)',
        type: String,
      },
      {
        name: 'status',
        required: false,
        description: 'Filter by status',
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
        description: 'Lessons retrieved successfully',
        schema: {
          example: {
            total: 100,
            page: 1,
            limit: 10,
            data: [
              {
                id: '123',
                name: 'Lesson Name',
                description: 'Lesson Description',
                resource: 'https://example.com/resource.mp4',
                courseId: 'UUID',
                status: 'in_progress',
                createdAt: '2024-08-18T10:26:19.373Z',
                updatedAt: '2024-08-18T10:26:19.373Z',
              },
            ],
          },
        },
      },
      notFound: {
        status: 404,
        description: 'No lessons found',
        schema: {
          example: {
            statusCode: 404,
            message: 'No lessons found',
          },
        },
      },
    },
  },

  update: {
    summary: {
      summary: 'Update lesson details',
    },
    param: {
      name: 'id',
      description: 'Lesson ID',
    },
    body: {
      type: UpdateLessonDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Lesson updated successfully',
        schema: {
          example: {
            message: 'Lesson updated successfully',
            payload: {
              id: 'UUID',
              name: 'Updated Lesson Name',
              description: 'Updated Lesson Description',
              resource: 'https://example.com/new-resource.mp4',
              courseId: 'UUID',
              status: 'completed',
              createdAt: '2024-08-18T10:26:19.373Z',
              updatedAt: '2024-08-18T10:26:19.373Z',
              deletedAt: null,
            },
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Lesson not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Lesson not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['Name must be a string'],
            resource: ['Resource is required'],
            status: ['Status is required'],
          },
        },
      },
    },
  },

  delete: {
    summary: {
      summary: 'Delete a lesson by ID',
    },
    param: {
      name: 'id',
      description: 'Lesson ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Lesson deleted successfully',
        schema: {
          example: {
            message: 'Lesson deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Lesson not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Lesson not found',
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

  submit: {
    summary: {
      summary: 'Submit a lesson',
    },
    param: {
      name: 'id',
      description: 'Lesson ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Lesson submitted successfully',
        schema: {
          example: {
            nextLessonId: 'UUID',
            nextLessonItem: 2,
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Lesson or next lesson not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Lesson or next lesson not found',
          },
        },
      },
    },
  },

  getByCourseId: {
    summary: {
      summary: 'Get lessons by course ID',
    },
    param: {
      name: 'courseId',
      description: 'Course ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Lessons retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              item: 1,
              name: 'Lesson Name',
              status: 'in_progress',
              type: 'video',
              createdAt: '2024-08-18T10:26:19.373Z',
              updatedAt: '2024-08-18T10:26:19.373Z',
              deletedAt: null,
            },
          ],
        },
      },
      notFound: {
        status: 404,
        description: 'No lessons found for the given course ID',
        schema: {
          example: {
            statusCode: 404,
            message: 'No lessons found for the given course ID',
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
