const http = require("http")

const requestListener = (req,res) => {
    res.setHeader("Content-Type","text/html")
    res.statusCode = 200

    const { method,url} = req
    if (method == "GET"){
        res.end("<h1>Hello GET</h1>")
    }
    if (method === "POST"){
        let body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })

        req.on('end',() => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body)
            res.end(`<h1>Hai,${name}</h1>`)
        })
    }
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port,host,() => {
    console.log(`server running on http://${host}:${port}`)
})
