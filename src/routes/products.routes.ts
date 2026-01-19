import { Router } from 'express';
import { get, getList, post, put, patch, remove, seed } from '../controllers/product.controller';
import { auth, authorize } from '../middlewares/auth.middleware';
import { Role } from '../types/role.type';

const router = Router();

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Récupère la liste de tous les produits.
 *      tags: [Products]
 *      parameters:
 *          - in: query
 *            name: search
 *            required: false
 *            description: Chercher une liste de produits qui contiennent la query
 *            schema:
 *              type: string
 *          - in: query
 *            name: page
 *            required: false
 *            description: Le numéro de page à retourner (obligatoire avec limit)
 *            schema:
 *              type: integer
 *          - in: query
 *            name: limit
 *            required: false
 *            description: La limite d'items à retourner par page (obligatoire avec page)
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Produit(s) trouvé(s). Retourne une liste vide si pas de produits.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          500:
 *              description: Erreur serveur.
 *
 */
router.get('/', getList);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Récupère un produit via son id
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID du produit
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Produit trouvé
 *          404:
 *              description: Produit non trouvé
 *          500:
 *              description: Erreur serveur.
 *
 */
router.get('/:id', get);

router.post('/seed', seed)

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Crée un nouveau produit
 *      tags: [Products]
 *      security:
 *          - bearerAuth: []
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
 *          401:
 *              description: Non authentifié - token manquant ou invalide
 *          403:
 *              description: Interdit - rôle insuffisant
 *          500:
 *              description: Erreur serveur.
 *
 */
router.post('/', auth, authorize(Role.admin), post);

/**
 * @swagger
 * /products/{id}:
 *  put:
 *      summary: Remplace un nouveau produit
 *      tags: [Products]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID du produit
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Produit remplacé avec succès
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Requête invalide
 *          401:
 *              description: Non authentifié - token manquant ou invalide
 *          403:
 *              description: Interdit - rôle insuffisant
 *          404:
 *              description: Produit non trouvé
 *          500:
 *              description: Erreur serveur.
 *
 */
router.put('/:id', auth, authorize(Role.admin), put);

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *      summary: Édite un produit
 *      tags: [Products]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PartialProduct'
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID du produit
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Produit modifié avec succès
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Requête invalide
 *          401:
 *              description: Non authentifié - token manquant ou invalide
 *          403:
 *              description: Interdit - rôle insuffisant
 *          404:
 *              description: Produit non trouvé
 *          500:
 *              description: Erreur serveur.
 *
 */
router.patch('/:id', auth, authorize(Role.admin), patch);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      summary: Supprime un produit
 *      tags: [Products]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID du produit
 *            schema:
 *              type: string
 *      responses:
 *          204:
 *              description: Produit supprimé avec succès
 *          401:
 *              description: Non authentifié - token manquant ou invalide
 *          403:
 *              description: Interdit - rôle insuffisant
 *          404:
 *              description: Produit non trouvé
 *          500:
 *              description: Erreur serveur.
 *
 */
router.delete('/:id', auth, authorize(Role.admin), remove);

export default router;
