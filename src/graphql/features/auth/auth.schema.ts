export const authSchema = `

    enum Role {
        admin
        user
    }
    
    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        email: String!
        password: String!
        role: Role
    }

    type TokenResult {
        jwtToken: String!
    }

    type RegisterResult {
        email: String!
        role: Role!
    }

    extend type Mutation {
        login(input: LoginInput!): TokenResult
        register(input: RegisterInput!): RegisterResult
    }

`;
