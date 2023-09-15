const http = require("http")

const requestListener = (req,res) => {
    res.setHeader("Content-Type","text/html")
    res.statusCode = 200

    const { method,url} = req
    if (method == "GET"){
        res.end("<h1>Hello GET</h1>")
    }
    if (method == "POST"){
       res.end("<h1>Hello POST</h1>")
    }
    if (method == "PUT"){
        res.end("<h1>Hello PUT</h1>")
    }
    if (method == "DELETE"){
        res.end("<h1>Hello DELETE</h1>")
    }


}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port,host,() => {
    console.log(`server running on http://${host}:${port}`)
})
