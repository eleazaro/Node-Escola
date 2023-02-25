const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://fhfolqey:Ecq6E_VXqr5TR2Ycofipy-8RTXSy5Qw5@kesavan.db.elephantsql.com/fhfolqey', { dialect: 'postgres' });

module.exports = sequelize;