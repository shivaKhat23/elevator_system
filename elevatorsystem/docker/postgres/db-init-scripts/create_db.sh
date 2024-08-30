#!/bin/bash

# Create the fitness app db
psql -U root -d postgres -c "CREATE DATABASE \"elevator-system\";"

# Create the user and grant privileges to the database
psql -U root -d postgres -c "CREATE USER \"elevator-system\" PASSWORD 'password'; GRANT ALL PRIVILEGES ON DATABASE \"elevator-system\" TO \"elevator-system\";"
