
```
psql -U postgres

\l
```

Assumes a role was created

```
CREATE ROLE todo WITH LOGIN PASSWORD 'todo';
```


Assumes a database was created

```
CREATE DATABASE todo with OWNER todo;
```

```
\c todo todo
```

```
\dt

```
