const http = require('http'); 
const { Command } = require('commander'); 
const fs = require('fs').promises; 
const path = require ('path'); 
const superagent = require ('superagent');

const program = new Command(); 
program
.requiredOption('-h, --host <host>', 'Server host' )
.requiredOption('-p, --port <port>', 'Server port' )
.requiredOption('-c, --cache <cache>', 'Cache directory');

try {
program.parse(process.argv); 
const options = program.opts();
const { host, port, cache } = options; 

const server = http.createServer ((req, res) => {
    res.writeHead (200, {'Content-Type' : 'text/plain' }); 
    res.end('Server is running\n'); 
});

server.listen (port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    console.log(`Cache directory: ${options.cache}`);
});
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
