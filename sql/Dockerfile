FROM mysql
COPY ./dump.sql docker-entrypoint-initdb.d/dump.sql

#584  docker stop sql
 # 585  docker rm sql
#  586  docker build -t sql .
# 587  docker run -d -p 3307:3306 --name sql -e MYSQL_ROOT_PASSWORD=password sql
# docker exec -it mysql bash -l