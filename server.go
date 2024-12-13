package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
)

func main() {
	port, debug := parseFlags()
	portValue := fmt.Sprint(":", port)

	http.Handle("/", http.FileServer(http.Dir("public")))

	listener, err := net.Listen("tcp", portValue)
	if err != nil {
		log.Fatal("Error starting server: ", err)
	}

	if debug {
		fmt.Println("Started debug server at http://localhost" + portValue)
	} else {
		fmt.Println("Started server on port " + portValue)
	}

	http.Serve(listener, nil)
	fmt.Println("Server stopped")
}

func parseFlags() (port uint, debug bool) {
	const (
		defaultPort = 3000
		portUsage   = "Describes the port the server will listen to."
		debugUsage  = "Whether to print additional debug messages."
	)

	flag.UintVar(&port, "port", defaultPort, portUsage)
	flag.UintVar(&port, "p", defaultPort, portUsage+" (shorthand)")

	flag.BoolVar(&debug, "debug", false, debugUsage)
	flag.BoolVar(&debug, "d", false, debugUsage+" (shorthand)")

	flag.Parse()

	return port, debug
}
