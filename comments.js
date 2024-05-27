// Create web server
// Create a web server that listens on port 3000 and serves up the comments.html file.
// The comments.html file should contain a form that has a textarea for the user to enter their comment and a submit button.
// When the form is submitted, the comment should be added to a list of comments in a file called comments.txt.
// Each comment should be on a new line in the file.
// The comments.html file should also display all the comments that have been added so far.
// Use the fs module to read from and write to the comments.txt file.

// Path: comments.js
// Create a web server
// Create a web server that listens on port 3000 and serves up the comments.html file.
// The comments.html file should contain a form that has a textarea for the user to enter their comment and a submit button.
// When the form is submitted, the comment should be added to a list of comments in a file called comments.txt.
// Each comment should be on a new line in the file.
// The comments.html file should also display all the comments that have been added so far.
// Use the fs module to read from and write to the comments.txt file.

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/comments') {
    if (req.method === 'GET') {
      fs.readFile(path.join(__dirname, 'comments.txt'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <head>
                <title>Comments</title>
              </head>
              <body>
                <h1>Comments</h1>
                <form action="/comments" method="POST">
                  <textarea name="comment"></textarea>
                  <button type="submit">Submit</button>
                </form>
                <ul>
                  ${data.split('\n').map(comment => `<li>${comment}</li>`).join('')}
                </ul>
              </body>
            </html>
          `);
        }