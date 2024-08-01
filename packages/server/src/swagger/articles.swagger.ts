import { CreateArticleDto, UpdateArticleDto } from '../dto/articles.dto.js';

export const articleSwagger = {
  create: {
    summary: {
      summary: 'Create a new article',
    },
    body: {
      type: CreateArticleDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Article created successfully',
        schema: {
          example: {
            message: 'Article created successfully',
          },
        },
      },
      conflict: {
        status: 302,
        description: 'Article already exists',
        schema: {
          example: {
            statusCode: 302,
            message: 'Article already exists',
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
            minutesRead: ['Minutes read must be a number'],
            hashtags: ['Hashtags must be an array'],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get article by ID',
    },
    param: {
      name: 'id',
      description: 'Article ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Article retrieved successfully',
        schema: {
          example: {
            id: '123',
            title: 'Article Title',
            image: 'https://example.com/image.jpg',
            description: 'This is a description of the article.',
            minutesRead: 5,
            generalInfoFile: 'media/articles-info/article.txt',
            hashtags: ['tech', 'news'],
            createdAt: 1622548800000,
            updatedAt: 1622548800000,
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Article not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Article not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Invalid article ID',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid article ID',
          },
        },
      },
    },
  },
  getAll: {
    summary: {
      summary: 'Get all articles or filter by hashtags',
    },
    query: {
      name: 'hashtags',
      required: false,
      description: 'Filter by hashtags',
    },
    responses: {
      success: {
        status: 200,
        description: 'Articles retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              title: 'Article Title',
              image: 'https://example.com/image.jpg',
              description: 'This is a description of the article.',
              minutesRead: 5,
              generalInfoFile: 'media/articles-info/article.txt',
              hashtags: ['tech', 'news'],
              createdAt: 1622548800000,
              updatedAt: 1622548800000,
            },
          ],
        },
      },
      notFound: {
        status: 404,
        description: 'Articles not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Articles not found',
          },
        },
      },
    },
  },
  getAllHashtags: {
    summary: {
      summary: 'Get all unique hashtags',
    },
    responses: {
      success: {
        status: 200,
        description: 'Hashtags retrieved successfully',
        schema: {
          example: ['tech', 'news', 'education'],
        },
      },
      error: {
        status: 500,
        description: 'Failed to retrieve hashtags',
        schema: {
          example: {
            error: 'Failed to retrieve hashtags',
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update article by ID',
    },
    param: {
      name: 'id',
      description: 'Article ID',
    },
    body: {
      type: UpdateArticleDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Article updated successfully',
        schema: {
          example: {
            message: 'Article updated successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Article not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Article not found',
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
            description: ['Description must be a string'],
            minutesRead: ['Minutes read must be a number'],
            hashtags: ['Hashtags must be an array'],
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete article by ID',
    },
    param: {
      name: 'id',
      description: 'Article ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Article deleted successfully',
        schema: {
          example: {
            message: 'Article deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Article not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Article not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid article ID'],
          },
        },
      },
    },
  },
};
