
## Setup

Create Role, Database and Table

```
psql -U postgres

CREATE ROLE todo WITH LOGIN PASSWORD 'todo';


CREATE DATABASE todo with OWNER todo;

\c todo todo


CREATE TABLE IF NOT EXISTS todo (
    id        SERIAL PRIMARY KEY,
    title     VARCHAR(255),
    completed boolean,
    ordering  integer,
    url       VARCHAR(255)
);

\dt

```

## Run

Dev

```
npm install -g nodemon
npm run dev
```

Prod 
```
npm start
```

