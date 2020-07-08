// ***CRIAR E INICIAR O SERVIDOR***
// a função express vai fazer o request, volta e fica nessa variável
const express = require("express")
// a const server vai executar o express, essa var recebeu uma função e essa função será executada
// no fim, o conteúdo da const server será um objeto,
// que poderá por exemplo, ligar o servidor
const server = express()

// pegar o banco de dados
const db = require("./database/db")


// *3- CONFIGURAR PASTA PÚBLICA
server.use(express.static("public"))

// *4- UTILIZANDO TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, 
    noCache: true
})

// **2- CONFIGURAR CAMINHOS da aplicação
//  pág inicial
// req: Requisição(pedido ao servidor, que é /)  res: Resposta(respost do servidor)
server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um título"})
})

// dirname: nome do diretório
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    // pegar dados do banco de dados
     db.all(`SELECT * FROM places`, function(err, rows) {
         if(err) {
             return console.log(err)
         }

        //  número total dos pontos de coleta
         const totalPlaces = rows.length
         // mostrar a pág html com os dados do banco de dados
         return res.render("search-results.html", { places: rows, totalPlaces: totalPlaces})
    })
})



// é uma função que ouvir e ligar a porta 3000
// quando o arquivo for executado
server.listen(3000)