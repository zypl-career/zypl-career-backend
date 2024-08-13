import {
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
  getSpecialtyDTO,
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
            payload: {
              name: 'Computer Science',
              EIOHPE: 'EIOHPE123',
              class: 3,
              specializationGroup: 2,
              clusterName: 'Engineering',
              clusterTag: 'ENG',
              specialtyDescription: 'A specialization in computer science',
              specialtyCode: 101,
              specialtyName: 'Bachelor of Computer Science',
              formOfEducation: 'Full-time',
              typeOfStudy: 'On-campus',
              languageOfStudy: 'English',
              universityName: 'XYZ University',
              monthlyIncome: 1000,
              skillsLevel: 5,
              futureGrowth: 'High',
              overview: 'An overview of the specialty',
              careerOpportunities: ['Software Development', 'Data Analysis'],
              id: 'f0294650-c31e-473e-9e48-e8a1446f10ee',
              createdAt: '2024-08-10T12:04:36.971Z',
              updatedAt: '2024-08-10T12:04:36.971Z',
              deletedAt: null,
            },
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            name: ['name must be a string'],
            // Other validation errors...
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
      successId: {
        status: 200,
        description: 'Specialty(s) retrieved successfully',
        schema: {
          example: {
            id: 'f0294650-c31e-473e-9e48-e8a1446f10ee',
            name: 'Computer Science',
            EIOHPE: 'EIOHPE123',
            class: 3,
            specializationGroup: 2,
            clusterName: 'Engineering',
            clusterTag: 'ENG',
            specialtyDescription: 'A specialization in computer science',
            specialtyCode: 101,
            specialtyName: 'Bachelor of Computer Science',
            formOfEducation: 'Full-time',
            typeOfStudy: 'On-campus',
            languageOfStudy: 'English',
            universityName: 'XYZ University',
            monthlyIncome: 1000,
            skillsLevel: 5,
            futureGrowth: 'High',
            overview: 'An overview of the specialty',
            careerOpportunities: ['Software Development', 'Data Analysis'],
            createdAt: '2024-08-10T12:04:36.971Z',
            updatedAt: '2024-08-10T12:04:36.971Z',
            deletedAt: null,
          },
        },
      },
      success: {
        status: 200,
        description: 'Specialty(s) retrieved successfully',
        schema: {
          example: {
            total: 1,
            page: '2',
            limit: '1',
            data: [
              {
                id: 'f0294650-c31e-473e-9e48-e8a1446f10ee',
                name: 'Computer Science',
                EIOHPE: 'EIOHPE123',
                class: 3,
                specializationGroup: 2,
                clusterName: 'Engineering',
                clusterTag: 'ENG',
                specialtyDescription: 'A specialization in computer science',
                specialtyCode: 101,
                specialtyName: 'Bachelor of Computer Science',
                formOfEducation: 'Full-time',
                typeOfStudy: 'On-campus',
                languageOfStudy: 'English',
                universityName: 'XYZ University',
                monthlyIncome: 1000,
                skillsLevel: 5,
                futureGrowth: 'High',
                overview: 'An overview of the specialty',
                careerOpportunities: ['Software Development', 'Data Analysis'],
                createdAt: '2024-08-10T12:04:36.971Z',
                updatedAt: '2024-08-10T12:04:36.971Z',
                deletedAt: null,
              },
            ],
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
      badRequest: {
        status: 400,
        description: 'Bad request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid specialty ID',
          },
        },
      },
    },
  },
  
  filter: {
    summary: {
      summary: 'Filter specialties based on criteria',
    },
    query: {
      type: getSpecialtyDTO,
    },
    responses: {
      success: {
        status: 200,
        description: 'Filtered specialties retrieved successfully',
        schema: {
          example: {
            data: [
              {
                id: '123',
                name: 'Specialty 1',
                // Other fields...
              },
              {
                id: '124',
                name: 'Specialty 2',
                // Other fields...
              },
            ],
            total: 2,
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
            // Other validation errors...
          },
        },
      },
    },
  },
  update: {
    summary: {
      summary: 'Update specialty by ID',
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
            payload: {
              name: 'Computer Science',
              EIOHPE: 'EIOHPE123',
              class: 3,
              specializationGroup: 2,
              clusterName: 'Engineering',
              clusterTag: 'ENG',
              specialtyDescription: 'A specialization in computer science',
              specialtyCode: 101,
              specialtyName: 'Bachelor of Computer Science',
              formOfEducation: 'Full-time',
              typeOfStudy: 'On-campus',
              languageOfStudy: 'English',
              universityName: 'XYZ University',
              monthlyIncome: 1000,
              skillsLevel: 5,
              futureGrowth: 'High',
              overview: 'An overview of the specialty',
              careerOpportunities: ['Software Development', 'Data Analysis'],
              id: 'f0294650-c31e-473e-9e48-e8a1446f10ee',
              createdAt: '2024-08-10T12:04:36.971Z',
              updatedAt: '2024-08-10T12:04:36.971Z',
              deletedAt: null,
            },
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
            // Other validation errors...
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
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            id: ['Invalid specialty ID'],
          },
        },
      },
    },
  },
};
