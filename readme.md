# CRUD RDBMS ToDos

REST API

Create

Read

Update

Delete

Postgres

[TodoMVC](https://todomvc.com/) Frontend UI


## My Setup

### Containers, Kubernetes

Docker Desktop
https://www.docker.com/products/docker-desktop/

```
docker -v
Docker version 20.10.14, build a224086
```

Clean out docker daemon

```
docker rm `docker ps -a -q`
docker rmi `docker images -a -q`
```

```
brew install kubectl
```

```
kubectl version
Client Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.6", GitCommit:"ad3338546da947756e8a88aa6822e9c11e7eac22", GitTreeState:"clean", BuildDate:"2022-04-14T08:41:58Z", GoVersion:"go1.18.1", Compiler:"gc", Platform:"darwin/arm64"}
```

### Java



#### Quarkus 

  [Quarkus](https://github.com/burrsutter/todo-apps/blob/main/quarkus.md)

#### Spring Boot

  NOT STARTED

### Node.js


#### Express

  [Express](https://github.com/burrsutter/todo-apps/blob/main/nodejs-express.md)

#### Fastify + Prisma

  [Fastify](https://github.com/burrsutter/todo-apps/blob/main/nodejs-fastify.md)

### .NET C#

C# tends to prefer port 5000

  [.NET](https://github.com/burrsutter/todo-apps/blob/main/dotnet.md)