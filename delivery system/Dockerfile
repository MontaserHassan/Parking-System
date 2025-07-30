FROM postgres:15

# Optional: set environment variables for default database and user
ENV POSTGRES_USER=admin \
    POSTGRES_PASSWORD=admin \
    POSTGRES_DB=mydatabase

# Optional: copy initialization scripts (SQL or shell) if you have any
# COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
