FROM mysql
ENV MYSQL_DATABASE nlp
ENV MYSQL_USER umduser
ENV MYSQL_PASSWORD password
ENV MYSQL_ROOT_PASSWORD password
COPY ./dump.sql docker-entrypoint-initdb.d/dump.sql