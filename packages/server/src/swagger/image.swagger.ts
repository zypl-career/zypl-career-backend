export const imageStorageSwagger = {
  upload: {
    summary: {
      summary: 'Upload an image',
    },
    body: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    responses: {
      success: {
        status: 201,
        description: 'Image uploaded successfully',
        schema: {
          example: {
            cid: 'QmT5NvUtoM5nX6eWyJ77zDeRDUcLBr5Y6z6B43qQJdYYa8',
          },
        },
      },
      validation: {
        status: 422,
        description: 'Validation error',
        schema: {
          example: {
            file: ['file must be a valid format'],
          },
        },
      },
    },
  },
  get: {
    summary: {
      summary: 'Get image by CID',
    },
    param: {
      name: 'cid',
      required: true,
      description: 'Content Identifier (CID) of the image',
    },
    responses: {
      success: {
        status: 200,
        description: 'Image retrieved successfully',
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
      notFound: {
        status: 404,
        description: 'Image not found',
        schema: {
          example: {
            statusCode: 404,
            message: 'Image not found',
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Bad request',
        schema: {
          example: {
            statusCode: 400,
            message: 'Invalid CID',
          },
        },
      },
    },
  },
};
