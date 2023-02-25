const Sequelize = require('sequelize');
const database = require('../db');

const Matricula = database.define('matricula', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'alunos',
            key: 'id',
        }
    },
    id_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cursos',
            key: 'id',
        }
    },
})

module.exports = Matricula;