Use nlp;

LOAD DATA LOCAL INFILE 
'var/lib/mysql-files/ratings.csv' 
into table nlp.temp fields terminated by ',' lines terminated by '\n' ignore 1 lines;