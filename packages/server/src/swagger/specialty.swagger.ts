import {
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
} from '../dto/specialty.dto.js';

export const specialtySwagger = {
  create: {
    summary: {
      summary: 'Create a new specialty',
    },
    body: {
      type: CreateSpecialtyDto,
    },
    responses: {
      success: {
        status: 201,
        description: 'Specialty created successfully',
        schema: {
          example: {
            message: 'Specialty created successfully',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            class: ['class must be a number'],
            specializationGroup: ['specializationGroup must be a string'],
            clusterName: ['clusterName must be a string'],
            clusterTag: ['clusterTag must be a string'],
            specialtyCode: ['specialtyCode must be a string'],
            specialtyName: ['specialtyName must be a string'],
            formOfEducation: ['formOfEducation must be a string'],
            typeOfStudy: ['typeOfStudy must be a string'],
            languageOfStudy: ['languageOfStudy must be a string'],
            universityName: ['universityName must be a string'],
            monthlyIncome: ['monthlyIncome must be a number'],
            careerOpportunities: [
              'careerOpportunities must be an array of strings',
            ],
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update a specialty by ID',
    },
    param: {
      name: 'id',
      description: 'Specialty ID',
    },
    body: {
      type: UpdateSpecialtyDto,
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialty updated successfully',
        schema: {
          example: {
            message: 'Specialty updated successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Specialty not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Specialty not found',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            class: ['class must be a number'],
            specializationGroup: ['specializationGroup must be a string'],
            clusterName: ['clusterName must be a string'],
            clusterTag: ['clusterTag must be a string'],
            specialtyCode: ['specialtyCode must be a string'],
            specialtyName: ['specialtyName must be a string'],
            formOfEducation: ['formOfEducation must be a string'],
            typeOfStudy: ['typeOfStudy must be a string'],
            languageOfStudy: ['languageOfStudy must be a string'],
            universityName: ['universityName must be a string'],
            monthlyIncome: ['monthlyIncome must be a number'],
            careerOpportunities: [
              'careerOpportunities must be an array of strings',
            ],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get specialty by ID or all specialties',
    },
    param: {
      name: 'id',
      required: false,
      description: 'Specialty ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialty(s) retrieved successfully',
        schema: {
          example: [
            {
              id: '123',
              name: 'Specialty Name',
              class: 1,
              specializationGroup: 'Group A',
              clusterName: 'Cluster 1',
              clusterTag: 'Tag 1',
              specialtyCode: 'SP123',
              specialtyName: 'Specialty 1',
              formOfEducation: 'Full-time',
              typeOfStudy: 'Bachelor',
              languageOfStudy: 'English',
              universityName: 'University 1',
              monthlyIncome: 5000,
              careerOpportunities: ['Opportunity 1', 'Opportunity 2'],
            },
          ],
        },
      },
      notFound: {
        status: 404,
        description: 'Specialty not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Specialty not found',
          },
        },
      },
    },
  },
  filter: {
    summary: {
      summary: 'Filter specialties with pagination',
    },
    query: {
      name: {
        type: 'string',
        description: 'Filter by name',
      },
      class: {
        type: 'number',
        description: 'Filter by class',
      },
      specializationGroup: {
        type: 'string',
        description: 'Filter by specialization group',
      },
      clusterName: {
        type: 'string',
        description: 'Filter by cluster name',
      },
      clusterTag: {
        type: 'string',
        description: 'Filter by cluster tag',
      },
      specialtyCode: {
        type: 'string',
        description: 'Filter by specialty code',
      },
      specialtyName: {
        type: 'string',
        description: 'Filter by specialty name',
      },
      formOfEducation: {
        type: 'string',
        description: 'Filter by form of education',
      },
      typeOfStudy: {
        type: 'string',
        description: 'Filter by type of study',
      },
      languageOfStudy: {
        type: 'string',
        description: 'Filter by language of study',
      },
      universityName: {
        type: 'string',
        description: 'Filter by university name',
      },
      monthlyIncome: {
        type: 'number',
        description: 'Filter by monthly income',
      },
      careerOpportunities: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Filter by career opportunities',
      },
      page: {
        type: 'number',
        description: 'Page number for pagination',
        default: 1,
      },
      limit: {
        type: 'number',
        description: 'Number of items per page',
        default: 10,
      },
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialties retrieved successfully',
        schema: {
          example: {
            data: [
              {
                id: '123',
                name: 'Specialty Name',
                class: 1,
                specializationGroup: 'Group A',
                clusterName: 'Cluster 1',
                clusterTag: 'Tag 1',
                specialtyCode: 'SP123',
                specialtyName: 'Specialty 1',
                formOfEducation: 'Full-time',
                typeOfStudy: 'Bachelor',
                languageOfStudy: 'English',
                universityName: 'University 1',
                monthlyIncome: 5000,
                careerOpportunities: ['Opportunity 1', 'Opportunity 2'],
              },
            ],
            total: 1,
            page: 1,
            limit: 10,
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            class: ['class must be a number'],
            specializationGroup: ['specializationGroup must be a string'],
            clusterName: ['clusterName must be a string'],
            clusterTag: ['clusterTag must be a string'],
            specialtyCode: ['specialtyCode must be a string'],
            specialtyName: ['specialtyName must be a string'],
            formOfEducation: ['formOfEducation must be a string'],
            typeOfStudy: ['typeOfStudy must be a string'],
            languageOfStudy: ['languageOfStudy must be a string'],
            universityName: ['universityName must be a string'],
            monthlyIncome: ['monthlyIncome must be a number'],
            careerOpportunities: [
              'careerOpportunities must be an array of strings',
            ],
          },
        },
      },
    },
  },
  delete: {
    summary: {
      summary: 'Delete specialty by ID',
    },
    param: {
      name: 'id',
      description: 'Specialty ID',
    },
    responses: {
      success: {
        status: 200,
        description: 'Specialty deleted successfully',
        schema: {
          example: {
            message: 'Specialty deleted successfully',
          },
        },
      },
      notFound: {
        status: 404,
        description: 'Specialty not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Specialty not found',
          },
        },
      },
    },
  },
};
