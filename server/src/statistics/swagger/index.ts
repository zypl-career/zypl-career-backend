import { EnumCities, EnumGenders, EnumRoles } from '../../user/type/index.js';

export const userStatisticsSwagger = {
  getStatistics: {
    summary: 'Get user statistics by criteria',
    query: {
      parameters: [
        {
          name: 'gender',
          required: false,
          description: 'Filter by user gender',
          schema: {
            type: 'string',
            enum: Object.values(EnumGenders),
          },
        },
        {
          name: 'role',
          required: false,
          description: 'Filter by user role',
          schema: {
            type: 'string',
            enum: Object.values(EnumRoles),
          },
        },
        {
          name: 'district',
          required: false,
          description: 'Filter by user district',
          schema: {
            type: 'string',
            enum: Object.values(EnumCities),
          },
        },
        {
          name: 'ageRanges',
          required: false,
          description:
            'Filter by age ranges. Provide an array of ranges in JSON format, e.g., [[12,22],[30,44]]',
          schema: {
            type: 'string',
            example: '[[12,22],[30,44]]',
          },
        },
      ],
    },
    responses: {
      success: {
        status: 200,
        description: 'User statistics retrieved successfully',
        schema: {
          example: {
            totalUsers: 100,
            usersByGender: [
              { gender: 'male', count: 60 },
              { gender: 'female', count: 40 },
            ],
            usersByRole: [
              { role: 'student', count: 70 },
              { role: 'teacher', count: 30 },
            ],
            usersByDistrict: [
              { district: 'Hissor', count: 20 },
              { district: 'Dushanbe', count: 50 },
              { district: 'Khujand', count: 30 },
            ],
            ageRangeStats: [
              {
                range: '[12, 22]',
                count: 25,
              },
              {
                range: '[30, 44]',
                count: 20,
              },
            ],
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Bad request due to invalid parameters',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid age ranges format. Each range must be an array of two numbers.',
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
