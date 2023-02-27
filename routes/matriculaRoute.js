const express = require('express');
const router = express.Router();
const Matricula = require('../models/matricula');
const database = require('../db');

router.use(express.json());

router.get("/", (req, resp) => {
    try {
        database.query("SELECT matriculas.id, alunos.nome, cursos.descricao FROM matriculas JOIN alunos ON matriculas.id_aluno = alunos.id JOIN cursos ON matriculas.id_curso = cursos.id").
            then((matriculas) => {
                resp.status(200).json({
                    statusCode: 200,
                    data: matriculas[0],
                });
            });


    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

router.get("/aluno/:id_aluno", (req, resp) => {
    const id = req.params.id_aluno;
    try {
        database.query("SELECT matriculas.id, cursos.descricao FROM matriculas JOIN alunos ON matriculas.id_aluno = alunos.id JOIN cursos ON matriculas.id_curso = cursos.id WHERE alunos.id = " + id).
            then((matriculas) => {
                resp.status(200).json({
                    statusCode: 200,
                    data: matriculas[0],
                });
            });


    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

router.get("/curso/:id_curso", (req, resp) => {
    const id = req.params.id_curso;
    try {
        database.query("SELECT matriculas.id, alunos.nome FROM matriculas JOIN alunos ON matriculas.id_aluno = alunos.id JOIN cursos ON matriculas.id_curso = cursos.id WHERE cursos.id = " + id).
            then((matriculas) => {
                resp.status(200).json({
                    statusCode: 200,
                    data: matriculas[0],
                });
            });


    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

router.post("/", (req, resp) => {
    try {
        for (const key in req.body) {
            Matricula.create(req.body[key]).then(c => {

            });
        }
        resp.status(200).json({
            statusCode: 200,

        });

    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }

});

router.delete("/:id", (req, resp) => {
    const id = req.params.id;
    try {
        Matricula.destroy({
            where: { id: id }
        }).then(() => {
            resp.status(200).json({
                statusCode: 200,
            });
        });

    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});


module.exports = router;