docker build -t express-api-umd .
docker run -p 3000:8080 -d --name express-api-umd express-api-umd
# docker run -d -p 3307:3306 --name my-sql-umd -e MYSQL_ROOT_PASSWORD=password my-sql-umd