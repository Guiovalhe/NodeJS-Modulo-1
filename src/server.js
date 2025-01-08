import { Database } from './middlewares/database.js'
import { json } from './middlewares/json.js'
import http from 'node:http'

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

const database = new Database

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {
        const users = database.select('users')

        return res.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        const user = {
            id: 1,
            name,
            email,
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }

    if (method === 'DELET' && url === '/users'){
        delete database.users()
    }

    return res.writeHead(404).end()
})

server.listen(3333)