const { Client } = require('@elastic/elasticsearch');

// Create and export Elasticsearch client
const client = new Client({
  node: 'http://localhost:9200', // Change if needed
});

module.exports = client;