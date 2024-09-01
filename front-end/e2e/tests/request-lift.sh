curl --location 'http://localhost:8081/api/floors/00b60e4a-fc91-481b-a20a-b3e37ab6db2b/lift-request' \
--header 'Content-Type: application/json' \
--data '{
    "direction": "UP"
}'

curl --location 'http://localhost:8081/api/floors/9ff9e83e-4451-4756-bea1-a39633ab0845/lift-request' \
--header 'Content-Type: application/json' \
--data '{
    "direction": "DOWN"
}'