# Overview

As a software engineer, I wanted to get hands-on experience with TypeScript by building a small but complete server-side application instead of just isolated code snippets. I chose to build a File Uploader and Downloader using TypeScript and Express, since it touches on several core language features at once: strong typing, classes, recursion, asynchronous functions, and working with lists of data.

The software is a Node.js web server that lets a user upload a file through an HTML form, see a list of all uploaded files, and download any of them back. Behind the scenes, the project uses a FileManager class to encapsulate file system access, a recursive countdown function to demonstrate recursion, async/await with fs/promises to read the uploads directory without blocking the server, and a custom UploadedFile interface to model file metadata with TypeScript's type system. The server also demonstrates exception handling with a try/catch block when listing files, so that a missing or unreadable folder doesn't crash the app.

My purpose in writing this software was to understand how TypeScript's type system integrates with a real Node.js/Express backend, how to type third-party libraries (like Express and Multer) using their @types packages, and how TypeScript's static typing catches mistakes before the code ever runs, compared to plain JavaScript.

# Software Demo Video

# Development Environment

I developed this project using Visual Studio Code as my editor, with the built-in terminal to run npm commands and test the server locally in the browser. I used Node.js and npm to manage dependencies and run the TypeScript compiler.

The project is written in TypeScript, compiled to JavaScript with the tsc compiler (configured through tsconfig.json in strict mode). It runs on Node.js using the Express framework for routing and serving HTTP requests, and Multer for handling multipart/form-data file uploads, with type definitions provided by @types/node, @types/express, and @types/multer.




# Useful Websites

- [TypeScript Official Site](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Wikipedia: TypeScript](https://en.wikipedia.org/wiki/TypeScript)
- [Express.js Documentation](https://expressjs.com/)
- [Multer GitHub Repository](https://github.com/expressjs/multer)
- [Node.js fs/promises Documentation](https://nodejs.org/api/fs.html#promises-api)


# Future Work


Move the HTML for each page (home, file list, upload confirmation) into separate static .html files served from a public folder, instead of building HTML strings inside server.ts.
Add file type and size validation when uploading (e.g., reject files over a certain size or with disallowed extensions).
Use the UploadedFile interface to actually store and display metadata (original name, size, upload date) instead of just the file name on disk.
Add a delete option so users can remove uploaded files from the list.
Add unit tests with Jest to cover the FileManager class and the recursive countdown function.
Read the server port and uploads folder path from environment variables instead of hardcoding them.