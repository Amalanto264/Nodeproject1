const http = require('http');
const fs = require('fs')


const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)
    const url = req.url
    const method = req.method
    if(url === '/'){
        
    res.write('<html>')
    res.write("<head><Title>enter a message</Title></head>")
    res.write('<body><form action="/message" method = "POST"><input type="text" name="message"><button type="submit">submit</button></form></body>')

    res.write('</html>')
    return res.end()

    }
    if(url==='/message' && method ==='POST'){
        const data = []
        req.on('data', (chunk)=>{
            console.log(chunk)
            data.push(chunk)
        })

        req.on('end',()=>{
            const parseddata = Buffer.concat(data).toString()
            const message = parseddata.split("=")[1]
            // console.log(parseddata)
            fs.writeFileSync("message.txt",message)
        })

        
        res.status = 302
        res.setHeader("Location",'/')
        return res.end

    }


    res.setHeader("Content-Type", "text/html")
    res.write('<html>')
    res.write("<head><Title>node server</Title></head>")
    res.write('<body><h2>This is from node server</h2></body>')

    res.write('</html>')
    res.end()

})

server.listen(3000)