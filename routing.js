//CREATING A SERVER
const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || '/product') {
        res.end('This is product');
    } else if (pathName === '/overview') {
        res.end('This is overview');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'

        });
        res.end('<h1>Page not Found</h1>');
    }

});


// Staring the server
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});