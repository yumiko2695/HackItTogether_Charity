const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, {
  logging: false
});

module.exports = db;

//Global Mocha hook used for resource cleanup (to ensure we exit tests once done)
if(process.env.NODE_ENV === 'test'){
  after('close database connection', () => db.close())
}
