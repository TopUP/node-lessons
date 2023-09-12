function getAxios(cb) {
    const axios = require('axios');

    axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            const fs    = require('fs');

            const posts = JSON.stringify(response.data);
            fs.writeFile('posts.txt', posts, err => {
                if (err) {
                    console.log('Ошибка записи в файл', err);
                }
            });

            cb(posts);
        })
        .catch((error) => {
            console.log(error)
        })
    ;
}

const http  = require('http');
const server = http.createServer((request, response) => {
    getAxios((posts) => {
        response
            .writeHead(200, {'Content-Type': 'application/json'})
            .end(posts)
        ;
    });
});

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
