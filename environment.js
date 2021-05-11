module.exports = {
  development: {
    port: 3002, // assign your own port no
    mongoUri: 'mongodb://192.168.1.195:27017/react-node',
    logs: 'dev'
  },
  production: {
    port: 3002, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/react-node',
    logs: 'combined'
  },
  test: {
    port: 3002, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/react-node',
    logs: 'dev'
  }
};

