/**
 * @swagger
 *
 * definitions:
 *  Game:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: dota
 *
 * /game:
 *   get:
 *     tags:
 *      - Games
 *     summary: Todos os games cadastrados
 *     description: Retorna um array de JSON com todos os games cadastrados
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: Tipo
 *        type: string
 *        description: Filtro de todos os games cadastrados
 *     responses:
 *       200:
 *         description: Array com todos os games cadastrados
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Game'
 *
 */