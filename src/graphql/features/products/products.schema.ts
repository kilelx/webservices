export const productsSchema = `
    scalar DateTime

    type Product {
        id: String!
        title: String!
        category: String!
        description: String!
        specs: String!
        price: Float!
        ean: String!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type CreateProductInput {
        title: String!
        category: String!
        description: String!
        specs: String!
        price: Float!
        ean: String!
    }

    type CreateProductInput {
        title: String
        category: String
        description: String
        specs: String
        price: Float
        ean: String
    }

    extend type Query {
        products: [Product!]!
    }

`;

/*

    type Mutation {
        createProduct(input: CreateProductInput): Product!
        updateProduct(id: ID!, input: UpdateProductInput): Product!
        deleteProduct(id: ID!): Boolean!
    }

*/
