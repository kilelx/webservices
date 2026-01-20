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

    input CreateProductInput {
        title: String!
        category: String!
        description: String!
        specs: String!
        price: Float!
        ean: String!
    }

    input UpdateProductInput {
        title: String
        category: String
        description: String
        specs: String
        price: Float
        ean: String
    }

    extend type Query {
        products: [Product!]!
        product(id: ID!): Product
    }

    extend type Mutation {
        createProduct(input: CreateProductInput): Product!
        updateProduct(id: ID!, input: UpdateProductInput!): Product
        deleteProduct(id: ID!): Boolean
    }

`;

/*

    type Mutation {
        createProduct(input: CreateProductInput): Product!
        updateProduct(id: ID!, input: UpdateProductInput): Product!
        deleteProduct(id: ID!): Boolean!
    }

*/
