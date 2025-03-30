const http = require('http'); 
const { Command } = require('commander'); 
const fs = require('fs').promises; 
const path = require('path'); 

const program = new Command(); 
program
    .requiredOption('-h, --host <host>', 'Server host')
    .requiredOption('-p, --port <port>', 'Server port')
    .requiredOption('-c, --cache <cache>', 'Cache directory');

try {
    program.parse(process.argv);
    const options = program.opts();
    const { host, port, cache } = options;

    const server = http.createServer(async (req, res) => {
        const code = req.url.slice(1);

        if (req.method === 'GET') {
            try {
                const filePath = path.join(cache, `${code}.jpg`);
                await fs.access(filePath);

                const image = await fs.readFile(filePath);
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(image);
            } catch (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Image not found');
            }
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    });

    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
        console.log(`Cache directory: ${cache}`);
    });

} catch (error) {
    console.error(error.message);
    process.exit(1);
}
