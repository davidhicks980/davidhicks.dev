#!/bin/bash -e

port=3000
go_server_pid=0

refresh_server() {
    if [ $go_server_pid -ne 0 ]; then
        echo "Killing $go_server_pid"
        kill $(lsof -t -i:$port)
    fi

    go build server.go
    ./server -p=$port -d=true &
    go_server_pid=$!
    echo "Server process PID: $go_server_pid"
}

refresh_server
while true; do
    read -rsn1 input
    if [ "$input" = "r" ]; then
        refresh_server
    fi
done
