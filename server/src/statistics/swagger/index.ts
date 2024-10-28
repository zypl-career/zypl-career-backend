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
      ],
    },
    responses: {
      success: {
        status: 200,
        description: 'User statistics retrieved successfully',
        schema: {
          example: {
            totalUsers: 8,
            usersByGender: [{ gender: 'male', count: 8 }],
            usersByRole: [{ role: 'student', count: 8 }],
            usersByDistrict: [
              { district: 'Hissor', count: 1 },
              { district: 'Dushanbe', count: 7 },
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
            message: 'Invalid parameters provided',
          },
        },
      },
    },
  },
};
