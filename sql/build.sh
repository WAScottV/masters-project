docker stop my-sql-umd
docker rm my-sql-umd
docker build -t my-sql-umd .
docker run -d -p 3307:3306 --name my-sql-umd -e MYSQL_ROOT_PASSWORD=password my-sql-umd
docker exec -it my-sql-umd bash -l