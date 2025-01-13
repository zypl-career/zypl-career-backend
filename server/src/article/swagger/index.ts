import { CreateArticleDto } from '../dto/create.js';
import { GetArticlesDto } from '../dto/get.js';
import { UpdateArticleDto } from '../dto/update.js';
import { IArticleSections } from '../type/index.js'; // Added import for IArticleSections

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
            payload: {
              id: 'UUID',
              title: 'Title text',
              description: 'Description text',
              image: 'image url',
              minutesRead: 10,
              generalInfoFile: 'General info file',
              hashtags: ['first', 'second'],
              sections: [
                IArticleSections.Partners,
                IArticleSections.UniversitiesAndColleges,
                IArticleSections.Professions,
                IArticleSections.Industries,
                IArticleSections.EducationalCenters,
                IArticleSections.Courses,
                IArticleSections.CareerArticles,
                IArticleSections.JobSeekerResources,
                IArticleSections.UserGuideVideos,
                IArticleSections.ParentArticles,
                IArticleSections.TeacherAndPractitionerArticles,
                IArticleSections.HomepageArticles,
              ], // Updated sections to include all enum items
              createdAt: '2024-08-10T10:26:19.373Z',
              updatedAt: '2024-08-10T10:26:19.373Z',
              deletedAt: null,
            },
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
            sections: ['Sections must be an array'],
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
            generalInfoFile: 'https://example.com/info.txt',
            hashtags: ['tech', 'news'],
            sections: [
              IArticleSections.Partners,
              IArticleSections.UniversitiesAndColleges,
              IArticleSections.Professions,
              IArticleSections.Industries,
              IArticleSections.EducationalCenters,
              IArticleSections.Courses,
              IArticleSections.CareerArticles,
              IArticleSections.JobSeekerResources,
              IArticleSections.UserGuideVideos,
              IArticleSections.ParentArticles,
              IArticleSections.TeacherAndPractitionerArticles,
              IArticleSections.HomepageArticles,
            ], // Updated sections to include all enum items
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
      summary: 'Get all articles or filter by various criteria with pagination',
    },
    query: GetArticlesDto,
    responses: {
      success: {
        status: 200,
        description: 'Articles retrieved successfully',
        schema: {
          example: {
            total: 100,
            page: 1,
            limit: 10,
            data: [
              {
                id: '123',
                title: 'Article Title',
                image: 'https://example.com/image.jpg',
                description: 'This is a description of the article.',
                minutesRead: 5,
                generalInfoFile: 'https://example.com/info.txt',
                hashtags: ['tech', 'news'],
                sections: [
                  IArticleSections.Partners,
                  IArticleSections.UniversitiesAndColleges,
                  IArticleSections.Professions,
                  IArticleSections.Industries,
                  IArticleSections.EducationalCenters,
                  IArticleSections.Courses,
                  IArticleSections.CareerArticles,
                  IArticleSections.JobSeekerResources,
                  IArticleSections.UserGuideVideos,
                  IArticleSections.ParentArticles,
                  IArticleSections.TeacherAndPractitionerArticles,
                  IArticleSections.HomepageArticles,
                ], // Updated sections to include all enum items
                createdAt: 1622548800000,
                updatedAt: 1622548800000,
              },
            ],
          },
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
            payload: {
              id: 'UUID',
              title: 'Title text',
              description: 'Description text',
              image: 'image url',
              minutesRead: 10,
              generalInfoFile: 'General info file',
              hashtags: ['first', 'second'],
              sections: [
                IArticleSections.Partners,
                IArticleSections.UniversitiesAndColleges,
                IArticleSections.Professions,
                IArticleSections.Industries,
                IArticleSections.EducationalCenters,
                IArticleSections.Courses,
                IArticleSections.CareerArticles,
                IArticleSections.JobSeekerResources,
                IArticleSections.UserGuideVideos,
                IArticleSections.ParentArticles,
                IArticleSections.TeacherAndPractitionerArticles,
                IArticleSections.HomepageArticles,
              ], // Updated sections to include all enum items
              createdAt: '2024-08-10T10:26:19.373Z',
              updatedAt: '2024-08-10T10:26:19.373Z',
              deletedAt: null,
            },
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
            sections: ['Sections must be an array'],
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
