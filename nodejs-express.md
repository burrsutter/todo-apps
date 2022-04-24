# Node.js 

[Node Version Manager - nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```
nvm --version
0.39.1

nvm install --lts

nvm use --lts

node --version
v16.14.2

npm --version
8.5.0

npx --version
8.5.0
```

```
mkdir ntodo
cd ntodo
```

```
npm init -y
```

```
npm install express
npm install nodemon
```

```
mkdir src
touch src/index.js
```

Edit src/index.js

```
const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
```

Edit package.json

```
{
  "name": "ntodo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.3",
    "nodemon": "^2.0.15"
  }
}

```

```
npm run dev
```

```
curl localhost:3000
```

INCOMPLETE
