# Quarkus


## Java Setup
https://sdkman.io/

```
sdk install java 17.0.2-open
sdk use java 17.0.2-open
```


```
java -version 
openjdk version "17.0.2" 2022-01-18
```

```
sdk install maven 3.8.5
sdk use maven 3.8.5
```

```
mvn -v
Apache Maven 3.8.5 (3599d3414f046de2324203b78ddcf9b5e4388aa0)
```

https://code.visualstudio.com/

Community Edition of IntelliJ IDEA

https://www.jetbrains.com/idea/download/#section=mac


## New Quarkus Project

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

Up to this moment, "mvn quarkus:dev" has been using its Dev Services capability to dynamically provide a Postgres Database.  

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

Here is the full listing if you just wish to copy & paste

```
%prod.quarkus.hibernate-orm.database.generation=update
%prod.quarkus.datasource.jdbc.url=jdbc:postgresql://postgresql/todo
%prod.quarkus.datasource.username=todo
%prod.quarkus.datasource.password=todo
quarkus.package.type=uber-jar
```


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

- PostgreSQL Connection Username: todo

- PostgreSQL Connection Password: todo

- PostgreSQL Database Name: todo

and click **Create**

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


Describe the schema

```
\d todo
```

```
                         Table "public.todo"
  Column   |          Type          | Collation | Nullable | Default
-----------+------------------------+-----------+----------+---------
 id        | bigint                 |           | not null |
 completed | boolean                |           | not null |
 ordering  | integer                |           |          |
 title     | character varying(255) |           |          |
 url       | character varying(255) |           |          |
```

### Deploy via OpenShift S2I

Assuming you followed the above instructions, just delete the current qtodo application

![Delete application](images/delete-application-1.png)

![Delete application](images/delete-application-2.png)

Create a git repo and `git commit` and `git push` the contents of qtodo (or just use the one I am providing)

Click +Add

![+Add](images/s2i-1.png)

Import from Git

![Import from Git](images/s2i-2.png)

Git Repo URL

https://github.com/burrsutter/todo-apps

And because I am using a sub-directory inside of a git repository, I need to click

*Show advanced Git options*

and type in `qtodo` there

![git](images/s2i-3.png)

Scroll-down, defaults should be fine

![git](images/s2i-4.png)

![git](images/s2i-5.png)

Click Create

The application will build and run, giving you a URL and you should see the Todos from your Drag & Drop deployment and testing still happily running in that same Postgres database as before.

![Finish](images/s2i-finish.png)

And you can create a webhook if you want future `git push` events to trigger a build and rollout of the application into your dev cluster

[Webhooks on OpenShift](https://redhat-scholars.github.io/openshift-starter-guides/rhs-openshift-starter-guides/4.9/nationalparks-java-codechanges-github.html#prerequisite_github_account)



### Deploy via Kubernetes yamls

Assuming you followed the above instructions, just delete the current qtodo application

![Delete application](images/delete-application-1.png)

![Delete application](images/delete-application-2.png)


Use `shift-command-p` on your keyboard


![shift-command-p](images/add-quarkus-extensions-1.png)

Hit Return

![Extensions](images/add-quarkus-extensions-2.png)

Type "Kube"

![Kube](images/add-quarkus-extensions-3.png)

Click it

![Selected](images/add-quarkus-extensions-4.png)

Hit Return

The new dependency gets added to your pom.xml

![Output](images/add-quarkus-extensions-5.png)

Open up target to see what is in there

![target](images/kubernetes-yamls-1.png)


At the terminal, type `mvn package`

and if it fails like the following:

```
[ERROR] Failed to execute goal io.quarkus.platform:quarkus-maven-plugin:2.8.1.Final:build (default) on project qtodo: Failed to build quarkus application: io.quarkus.builder.BuildException: Build failure: Build failed due to errors
[ERROR] 	[error]: Build step io.quarkus.kubernetes.client.deployment.KubernetesClientBuildStep#process threw an exception: io.fabric8.kubernetes.client.KubernetesClientException: JcaPEMKeyConverter is provided by BouncyCastle, an optional dependency. To use support for EC Keys you must explicitly add this dependency to classpath.
[ERROR] 	at io.fabric8.kubernetes.client.internal.CertUtils.handleECKey(CertUtils.java:164)
[ERROR] 	at io.fabric8.kubernetes.client.internal.CertUtils.loadKey(CertUtils.java:134)
[ERROR] 	at io.fabric8.kubernetes.client.internal.CertUtils.createKeyStore(CertUtils.java:112)
[ERROR] 	at io.fabric8.kubernetes.client.internal.CertUtils.createKeyStore(CertUtils.java:247)
[ERROR] 	at io.fabric8.kubernetes.client.internal.SSLUtils.keyManagers(SSLUtils.java:153)
```

Make sure all of these dependencies are in your pom.xml

```
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-kubernetes</artifactId>
    </dependency>
    <dependency>
      <groupId>org.bouncycastle</groupId>
      <artifactId>bcprov-jdk15on</artifactId>
      <version>1.70</version>
    </dependency>
    <dependency>
      <groupId>org.bouncycastle</groupId>
      <artifactId>bcpkix-jdk15on</artifactId>
      <version>1.70</version>
    </dependency>
```

If failed, add the dependencies and try again

At the terminal, type `mvn package`

If all goes well, you now have a kubernetes.yaml file which can be applied to minikube, OpenShift, GKE, etc.  

Note: This does NOT include postgres, getting that service up and running on your Kubernetes cluster will need to be researched and executed manually

![target/kubernetes](images/kubernetes-yamls-2.png)
