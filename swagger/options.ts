import { ProductSchema, PostProductSchema, PartialProductSchema } from './components/schemas/product.schema';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API RESTful en TS',
    },
    servers: [{ url: 'http://localhost:3000/api/v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT nécessaire dans l'en-tête Authorization: Bearer <token>"
        }
      },
      schemas: {
        ...ProductSchema,
        ...PostProductSchema,
        ...PartialProductSchema,
      },
    },
  },
  apis: ['./src/**/*.ts'], // <= important: .ts et non .js
};

export default swaggerOptions;
