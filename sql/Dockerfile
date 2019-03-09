FROM mysql
ENV MYSQL_DATABASE nlp
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

#584  docker stop sql
 # 585  docker rm sql
#  586  docker build -t sql .
# 587  docker run -d -p 3307:3306 --name sql -e MYSQL_ROOT_PASSWORD=password sql