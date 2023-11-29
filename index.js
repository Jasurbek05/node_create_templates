const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    if(req.method === "GET"){
        res.writeHead(200, {"Content-Type": "text/html"})
        if (req.url === '/'){
            fs.readFile(path.join(__dirname, 'templates', 'index.html'), 'utf-8', (err, content) => {
                if (err) throw err
                res.end(content)
            })
        }else if (req.url === '/contact'){
            fs.readFile(path.join(__dirname, 'templates', 'contact.html'), 'utf-8', (err, content) => {
                if (err) throw err
                res.end(content)
            })
        }
        else if (req.url === '/about'){
            fs.readFile(path.join(__dirname, 'templates', 'about.html'), 'utf-8', (err, content) => {
                if (err) throw err
                res.end(content)
            })
        }
    }else if (req.method === 'POST'){
        const names = []

        req.on('data', data => {
            names.push(Buffer.from(data))
        })
        req.on('end', () => {
            const message = names.toString().split('=')[1]
            res.end(`Email successfully added: ${message} `)
        })
    }

})

server.listen(3000, () => {
    console.log("Server was created with port: 3000")
})