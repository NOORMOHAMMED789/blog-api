const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html' })

    res.write("<h1>Hello node js servering is running</h1>")
    res.end()
})

//specify the port
const port = 3002

server.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
})