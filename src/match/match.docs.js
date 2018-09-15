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
 * /match:
 *   get:
 *     tags:
 *      - Matches
 *     summary: Todas as partidas marcadas
 *     description: Retorna um array de JSON com todas as partidas marcadas
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: Tipo
 *        type: String
 *        description: Partidas marcadas
 *     responses:
 *       200:
 *         description: Array com todas as partidas marcadas
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Game'
 *
 */