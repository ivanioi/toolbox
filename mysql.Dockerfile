FROM mysql:8.0
WORKDIR /app
COPY ./toolbox-backend/sql/init.sql /docker-entrypoint-initdb.d/
RUN chmod +777 /docker-entrypoint-initdb.d/init.sql
