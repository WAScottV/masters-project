!/bin/bash

CMD=$1

IMAGE_TAG=latest

IMAGE_NAME="my-database"

CONTAINER_NAME="my-database"

DATABASE_NAME="test_db"

MYSQL_ROOT_PASSWORD="root"

DATABASE_PORT="3306"

case $CMD in
    build)
        docker build -t  $IMAGE_NAME .
        ;;
    start)
        CMD="docker run"
        CMD="$CMD --rm"
        CMD="$CMD --net=bridge"
        CMD="$CMD --name $CONTAINER_NAME"
        CMD="$CMD -p $DATABASE_PORT:$DATABASE_PORT"
        CMD="$CMD -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD"
        CMD="$CMD -td $IMAGE_NAME:$IMAGE_TAG"
        echo "$CMD"
        eval $CMD
        ;;
    init)
        CMD="docker run"
        CMD="$CMD --rm"
        CMD="$CMD --net=bridge"
        CMD="$CMD --name $CONTAINER_NAME"
        CMD="$CMD -p $DATABASE_PORT:$DATABASE_PORT"
        CMD="$CMD -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD"
        CMD="$CMD -td $IMAGE_NAME:$IMAGE_TAG"
        echo "$CMD"
        eval $CMD;

        echo "Waiting for mysql start"
        while ! docker exec -it  $CONTAINER_NAME mysqladmin -p$MYSQL_ROOT_PASSWORD ping &>/dev/null ; do sleep 1 ; done

        sleep 10

        echo "Loading database data"
        docker exec -it $CONTAINER_NAME mysql -p$MYSQL_ROOT_PASSWORD $DATABASE_NAME -e "LOAD DATA LOCAL INFILE 'var/lib/mysql-files/ratings.csv' INTO TABLE rating FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'";

        ;;
    stop)
        docker stop $CONTAINER_NAME
        ;;
    remove)
        docker rm -f $CONTAINER_NAME
        ;;
    rmi)
        docker rmi -f $CONTAINER_NAME
        ;;
    *)
        echo "Usage : build | start <image_tag> | stop | remove | rmi"
        ;;
esac

exit 0