const path = require('path');

module.exports = {
  migrations: {
    directory: path.join(__dirname, '..', '..', 'db', 'migrations')
  }
};
