import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// UUID => Unique Universal ID

// - Criar usúarios
// - Listagem usúarios
// - Edição de usúarios
// - Remoção de usúarios

// - HTTP
//  - Método HTTP
//  - URL

// GET => Buscar recurso no back-end
// POST => Criar recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação esspecífica de um recurso especifico no back-end
// DELET => Deletar um recurso do back-end

// GET /users => Buscar usúarios do back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados (informações adicionais de como o Dado pode ser interpretado pelo front-end)

// HTTP Status Code

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Diego
// GET http://localhost:3333/users/1 => DELET http://localhost:3333/users/1
// POST http://localhost:3333/users




const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)