package database

import (
	"encoding/json"
	"fmt"
	"github.com/gocql/gocql"
	"io/ioutil"
)

type CassandraConfig struct {
	Cluster  []string
	Keyspace string
}

type DatabaseStatus struct {
	Code  int
	Error error
	Ok    bool
}

var conf = CassandraConfig{}
var conn = &gocql.Session{}

func init() {
	conf = readCassandraConfig()
	conn = cassandraConnect()
}

func cassandraConnect() (session *gocql.Session) {
	fmt.Printf("Establishing database connection to cluster at %v...\n", conf.Cluster)
	cluster := gocql.NewCluster(conf.Cluster...)
	cluster.ProtoVersion = 4
	cluster.Keyspace = conf.Keyspace
	cluster.Consistency = gocql.Quorum
	session, err := cluster.CreateSession()
	if err != nil {
		fmt.Printf("failed to establish connection to host %V... program will terminate\n", conf.Cluster)
		panic(err)
	}
	fmt.Printf("Connected to database at %v\n", conf.Cluster)
	return session
}

func CassandraDisconnect() {
	conn.Close()
}

func readCassandraConfig() CassandraConfig {
	f, err := ioutil.ReadFile(`cassandra-config.json`)
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}
	file := []byte(string(f))
	configuration := CassandraConfig{}
	err = json.Unmarshal(file, &configuration)
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}
	return configuration
}
