## Quarkus


https://code.quarkus.io/

RESTEasy Reactive
RESTEasy Reactive Jackson
Hibernate ORM with Panache
SmallRye OpenAPI
SmallRye Health
Micrometer Metrics
Micrometer Registry Prometheus
JDBC Driver - PostgresSQL


![code.quarkus.io](images/code.quarkus.io-1.png)

![code.quarkus.io](images/code.quarkus.io-2.png)

```
mkdir ~/projects/todo-projects

cd ~/projects/todo-projects

mv ~/Downloads/qtodo.zip .

unzip qtodo.zip

cd qtodo

tree qtodo

.
├── README.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    ├── main
    │   ├── docker
    │   │   ├── Dockerfile.jvm
    │   │   ├── Dockerfile.legacy-jar
    │   │   ├── Dockerfile.native
    │   │   └── Dockerfile.native-micro
    │   ├── java
    │   │   └── com
    │   │       └── burrsutter
    │   │           ├── GreetingResource.java
    │   │           └── MyLivenessCheck.java
    │   └── resources
    │       ├── META-INF
    │       │   └── resources
    │       │       └── index.html
    │       └── application.properties
    └── test
        └── java
            └── com
                └── burrsutter
                    ├── GreetingResourceIT.java
                    └── GreetingResourceTest.java

```

```
code .
```

![Visual Studio Code](images/visual-studio-code-1.png)


```
mvn quarkus:dev
```

![mvn quarkus:dev](images/mvn-quarkus-dev.png)

```
curl localhost:8080/hello
Hello from RESTEasy Reactive
```

![quarkus devUI 1](images/quarkus-devUI-1.png)

![quarkus devUI 2](images/quarkus-devUI-2.png)

![quarkus devUI 3](images/quarkus-devUI-3.png)

![quarkus devUI 4](images/quarkus-devUI-4.png)


Back to VS Code


New File

```
Todo.java
```


```
@Entity

extends PanacheEntity
```

Shift-Option-O (Organize Imports)

![Todo Entity started](images/q-todo-entity-1.png)

New File

```
TodoResource.java
```

```
@Path("/api")
@Produces("application/json")
@Consumes("application/json")
```

Shift-Option-O (Organize Imports)

```
    @GET
    public List<Todo> getAll() {
        return Todo.listAll();
    }
```

Shift-Option-O (Organize Imports)

Ctrl-S  (Save)

```
curl http://localhost:8080/api
[]
```

```
    @POST
    @Transactional
    public Response create(Todo item) {
        item.id = null;
        item.persist();
        return Response.status(Status.CREATED).entity(item).build();
    }
```

Shift-Option-O (Organize Imports)

Ctrl-S  (Save)


```
curl -X 'POST' \
  'localhost:8080/api' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "title": "Do a thing",
  "completed": false
}'
```

```
curl http://localhost:8080/api
[{"id":1,"title":"Do a thing","completed":false,"order":0,"url":null}]
```

Drag & Drop frontend js, node_modules, package.json, package-lock.json, package.json, todo.html

to src/resources/META-INF/resources

![drag-n-drop frontend](images/drag-n-drop-frontend.png)

Browser: http://localhost:8080/todo.html

Enter "Do another thing"

![Todo MVC](images/todo-mvc-1.png)


```
    @PATCH
    @Path("/{id}")
    @Transactional
    public Response update(Todo todo, @PathParam("id") Long id) {
        Todo entity = Todo.findById(id);
        entity.id = id;
        entity.completed = todo.completed;
        entity.order = todo.order;
        entity.title = todo.title;
        entity.url = todo.url;
        return Response.ok(entity).build();
```    

Refresh Browser: http://localhost:8080/todo.html

Add Fred, Sally, John and UPDATED! on Sally

![Todo MVC](images/todo-mvc-2.png)

```
    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteOne(@PathParam("id") Long id) {
        Todo entity = Todo.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Todo with id of " + id + " does not exist.", Status.NOT_FOUND);
        }
        entity.delete();
        return Response.noContent().build();
    }
```

Ctrl-S

Refresh Browser: http://localhost:8080/todo.html

Add Apple, Banana, Grapefruit

![Todo MVC](images/todo-mvc-3.png)

And then hit the red X beside Banana

Refresh Browser: http://localhost:8080/todo.html

![Todo MVC](images/todo-mvc-4.png)


Browser: http://localhost:8080/q/swagger-ui/

![Swagger UI 1](images/swagger-ui-1.png)

![Swagger UI 2](images/swagger-ui-2.png)

Up to this moment, "mvn quarkus:dev" has been using its Dev Services capbility to dynamically provide a Postgres Database.  

http://localhost:8080/q/dev/io.quarkus.quarkus-vertx-http/dev-services

![Dev Services](images/dev-services-1.png)

This magic was faciltated by the inclusion of the Postgress JDBC Driver, TestContainers and Docker Desktop.

```
docker ps
```

![Dev Services](images/dev-services-2.png)

To get ready for testing within Kubernetes/OpenShift, we need to provide the declarative properties and connection parameters.


Edit application.properties

Type "q.h.d.g" and hit return

![application.properties begin](images/application.properties-1.png)

Type "update" and hit return

Type "q.d.j.u" and hit return

Type "jdbc:postgresql://postgresql/todo" and hit return

Type "q.d.us" and hit return

Type "todo" and hit return

Type "q.d.p" and hit return

Type "todo" and hit return

Type "q.p.ty" and hit return

Type "uber-jar" and hit return

Cntrl-S

![application.properties end](images/application.properties-2.png)

Add a prefix of `%prod` so that things work more cleanly between your localhost dev mode and your test/production cluster.

![application.properties prod](images/application.properties-3.png)


Make sure to "Ctrl-C" the `mvn quarkus:dev` and shut it down

```
mvn package
```


```
ls -la target
total 72064
drwxr-xr-x  13 burr  staff       416 Apr 23 15:29 .
drwxr-xr-x@ 12 burr  staff       384 Apr 23 13:33 ..
drwxr-xr-x   5 burr  staff       160 Apr 23 13:37 classes
drwxr-xr-x   3 burr  staff        96 Apr 23 13:33 generated-sources
drwxr-xr-x   3 burr  staff        96 Apr 23 13:33 generated-test-sources
drwxr-xr-x   3 burr  staff        96 Apr 23 15:23 maven-archiver
drwxr-xr-x   3 burr  staff        96 Apr 23 13:33 maven-status
-rw-r--r--   1 burr  staff  35653430 Apr 23 15:29 qtodo-1.0.0-SNAPSHOT-runner.jar
-rw-r--r--   1 burr  staff   1232955 Apr 23 15:29 qtodo-1.0.0-SNAPSHOT.jar.original
drwxr-xr-x   3 burr  staff        96 Apr 23 13:37 quarkus
-rw-r--r--   1 burr  staff       121 Apr 23 15:29 quarkus-artifact.properties
drwxr-xr-x   4 burr  staff       128 Apr 23 15:22 surefire-reports
drwxr-xr-x   4 burr  staff       128 Apr 23 15:29 test-classes
```

The `qtodo-1.0.0-SNAPSHOT-runner.jar` is the one you want for Drag & Drop

You can run a quick test of it by simply using


### Deploy via OpenShift Drag & Drop

For an easy way to get an OpenShift, go to https://developers.redhat.com/developer-sandbox/get-started

[OpenShift Sandbox](https://developers.redhat.com/developer-sandbox/get-started)

Account creation and login skipped for the purposes of this tutorial

![Sandbox 1](images/sandbox-1.png)

![Sandbox 2](images/sandbox-2.png)

![Sandbox 3](images/sandbox-3.png)

![Sandbox 4](images/sandbox-4.png)

![Sandbox 5](images/sandbox-5.png)

![Drag-N-Drop 1](images/drag-n-drop-1.png)

![Drag-N-Drop 2](images/drag-n-drop-2.png)

Hit the Create button

![Drag-N-Drop 3](images/drag-n-drop-3.png)

You should get a red ring because the app needs a database

Add 

![Postgres 1](images/postgres-1.png)

![Postgres 2](images/postgres-2.png)

![Postgres 3](images/postgres-3.png)

![Postgres 4](images/postgres-4.png)

Answer some questions

PostgreSQL Connection Username: todo
PostgreSQL Connection Password: todo
PostgreSQL Database Name: todo

and click Create

![Postgres 5](images/postgres-5.png)

Looking for blue rings

![Todo on OpenShift](images/todo-openshift-1.png)

![Blue rings](images/voila-1.png)

Find the URL,

![Find the URL](images/voila-2.png)

Add some Todos 

![Add ToDos](images/voila-3.png)

Now, let's go see if our data really landed in the database, back in the OpenShift Console, Click on DC postgresql

![Postgres](images/voila-4.png)

Click on pod identifier/name

![Pod details](images/voila-5.png)

Click on Terminal and type `psql`

![psql](images/voila-6.png)


See the databases

```
\l
```

See the users

```
\du
```

![users](images/voila-7.png)

Connect to the todo database

```
\c todo
```

See the tables

```
\dt
```

![tables](images/voila-8.png)

See the todos

```
select * from todos;
```

Note: That trailing semi-colon is VERY important


![todos](images/voila-9.png)

### Deploy via Kubernetes yamls


### Deploy via OpenShift S2I

Create a git repo and `git commit` and `git push` the contents of qtodo in

