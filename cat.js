const http = require('http'); // модуль для роботи з HTTP-запитами
const { Command } = require('commander'); // бібліотека для створення командного інтерфейсу
const fs = require('fs').promises; // дозволяє асинхронно працювати з файлами 
const path = require ('path'); // модуль для роботи з файловою системою
const superagent = require ('superagent'); // використовується для виконання HTTP-запитів

const program = new Command(); // створюємо новий екземпляр програми
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
    console.log('Server is running on http://${host}:${port}');
});
} catch (error) {
    console.eeror('Error, please check the command line arguments');
    console.error(error.message);
    process.exit(1);
}
