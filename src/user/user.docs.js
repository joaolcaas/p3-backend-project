/**
 * @swagger
 *
 * definitions:
 *  Usuario:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: nome
 *          email:
 *              type: string
 *              example: any@any.any
 *          games_matched:
 *              type: array
 *              example: ['dota2','lol']
 *          role:
 *              type: string
 *              example: adm
 *
 * /usuario:
 *   get:
 *     tags:
 *      - Usuários
 *     summary: Todos os usuários cadastrados
 *     description: Retorna um array de JSON com todos os usuários cadastrados
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: query
 *        name: Tipo
 *        type: string
 *        description: Filtro de tipos de usuários cadastrados
 *     responses:
 *       200:
 *         description: Array com todos os usuários
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Usuario'
 *
 *   post:
 *     tags:
 *      - Usuários
 *     summary: Adiciona um usuário ao sistema
 *     description: Retorna uma mensagem confirmando que o usuários foi adicionado
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: Novo Usuário
 *        in: body
 *        description: Propriedades do novo usuário
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Usuario'
 *     responses:
 *       200:
 *         description: Usuário adicionado com sucesso
 *
 * /usuario/{id}:
 * 
 *  get:
 *      tags:
 *          - Usuários
 *      summary: Usuário cadastrado
 *      description: Retorna um dos usuários cadastrados
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numero do usuário cadastrado
 *      responses:
 *          200:
 *              description: Usuário cadastrado
 *              schema:
 *                  $ref: '#/definitions/Usuario'
 *
 *  put:
 *      tags:
 *          - Usuários
 *      summary: Atualizar usuário cadastrado
 *      description: Retorna uma mensagem confirmando a atualização do usuário
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numero do usuário cadastrado
 *          - name: Update
 *            in: body
 *            description: Valores a serem atualizados
 *            schema:
 *              $ref: '#/definitions/Usuario'
 *      responses:
 *          200:
 *              description: Usuario atualizado
 *
 *  delete:
 *      tags:
 *          - Usuários
 *      summary: Excluir usuário do sistema
 *      description: Retorna uma mensagem confirmando a exclusão do usuário
 *      produces:
 *          - string
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numero do usuário cadastrado
 *      responses:
 *          200:
 *              description: Usuário excluído
 */