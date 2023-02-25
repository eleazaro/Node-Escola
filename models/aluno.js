const Sequelize = require('sequelize');
const database = require('../db');

const Aluno = database.define('aluno', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
})

module.exports = Aluno;