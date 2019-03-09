docker stop sql
docker rm sql
docker build -t sql .
docker run -d -p 3307:3306 --name sql -e MYSQL_ROOT_PASSWORD=password sql
docker exec -it sql bash -l