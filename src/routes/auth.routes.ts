import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Crée un nouveau produit
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PostProduct'
 *      responses:
 *          201:
 *              description: Produit créé avec succès
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Requête invalide
 *          500:
 *              description: Erreur serveur.
 *
 */
router.post('/login', login);

router.post('/register', register);

export default router;
