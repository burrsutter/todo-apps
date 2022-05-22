URL='localhost:3000/api'

curl -X 'POST' \
  $URL \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "title": "Learn Node.js",
  "completed": false
}'

curl -X 'POST' \
  $URL \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "title": "Learn Fastify",
  "completed": false
}'

curl -X 'POST' \
  $URL \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "title": "Learn Prisma",
  "completed": false
}'

curl -X 'POST' \
  $URL \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "title": "Happy Dance",
  "completed": false
}'

