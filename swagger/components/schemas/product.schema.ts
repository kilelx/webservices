export const ProductSchema = {
  Product: {
    type: 'object',
    required: ['id', 'title', 'category', 'description', 'specs', 'price', 'ean'],
    properties: {
      id: { type: 'integer', example: 1 },
      title: { type: 'string', example: 'Un super produit' },
      category: { type: 'string', example: 'Voitures de luxe' },
      description: { type: 'string', example: 'Ceci est un super produit' },
      specs: { type: 'string', example: 'Il a de super specs également' },
      price: { type: 'number', format: 'float', example: 99.99 },
      ean: { type: 'string', example: "678928976328742" },
    },
  },
};

export const PostProductSchema = {
  PostProduct: {
    type: 'object',
    required: ['title', 'category', 'description', 'specs', 'price'],
    properties: {
      title: { type: 'string', example: 'Un super produit' },
      category: { type: 'string', example: 'Voitures de luxe' },
      description: { type: 'string', example: 'Ceci est un super produit' },
      specs: { type: 'string', example: 'Il a de super specs également' },
      price: { type: 'number', format: 'float', example: 99.99 },
    },
  },
};

export const PartialProductSchema = {
  PartialProduct: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'Un super produit' },
      category: { type: 'string', example: 'Voitures de luxe' },
      description: { type: 'string', example: 'Ceci est un super produit' },
      specs: { type: 'string', example: 'Il a de super specs également' },
      price: { type: 'number', format: 'float', example: 99.99 },
    },
  },
};
