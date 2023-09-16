const http = require("http")

const requestListener = (req,res) => {
    res.setHeader("Content-Type","application/json")
    res.setHeader("X-Powered-By","NodeJS")
    res.statusCode = 200

    const { method,url} = req
    if (url == "/"){
        if (method == "GET"){
            res.statusCode = 200
            res.end(JSON.stringify({
                message:"Ini adalah halaman homepage"
            }))
        }else{
            res.statusCode = 404
            res.end(`Halaman tidak dapat diakses dengan ${method} request`)
        }
    }else if (url == "/about"){
        if (method == "GET"){
            res.statusCode = 200
            res.end(JSON.stringify({
                message:"Ini adalah halaman about"
            }))
        }else if (method === "POST"){
            let body = []
            req.on('data', (chunk) => {
                body.push(chunk)
            })

            req.on('end',() => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body)
                res.statusCode = 200
                res.end(JSON.stringify({
                    message:`Hei ${name}, ini adalah halaman about.`
                }))
            })   
        }else{
            res.statusCode = 404
            res.end(JSON.stringify({
                message:`Halaman tidak dapat diakses dengan ${method} request`
            }))
        }
    } else{
        res.statusCode = 404
        res.end(JSON.stringify({
            message:"Halaman tidak dapat ditemukan"
        }))
    }
}
const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port,host,() => {
    console.log(`server running on http://${host}:${port}`)
})
