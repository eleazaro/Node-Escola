const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');
const Matricula = require('../models/matricula');

router.use(express.json());

router.get("/:id", (req, resp) => {
    try {
        Aluno.findByPk(req.params.id).then((aluno) => {
            resp.status(200).json({
                statusCode: 200,
                data: aluno,
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

router.put("/:id", (req, resp) => {
    try {
        Aluno.findByPk(req.params.id).then((aluno) => {
            aluno.update(req.body).then((updated) => {
                resp.status(200).json({
                    statusCode: 200,
                    data: updated,
                });
            })
        });

    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

router.get("/", (req, resp) => {
    try {
        Aluno.findAll().then((alunos) => {
            resp.status(200).json({
                statusCode: 200,
                data: alunos,
            });

        });
    } catch {
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

router.post("/", (req, resp) => {
    try {
        Aluno.create(req.body).then((aluno) => {
            resp.status(200).json({
                statusCode: 200,
                data: aluno,
            });

        });
    } catch {
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

router.delete("/:id", (req, resp) => {
    const idAluno = req.params.id;
    try {
        Matricula.findAll({
            where: { id_aluno: idAluno }
        }).then((matriculas) => {
            if (matriculas.length == 0) {
                Aluno.destroy({
                    where: { id: idAluno }
                }).then(() => {
                    resp.status(200).json({
                        statusCode: 200,
                    });
                });
            } else {
                resp.status(403).json({
                    statusCode: 403,
                    data: null,
                });
            }
        })

    } catch (e) {
        console.log(e.toString());
        resp.status(500).json({
            statusCode: 500,
            data: null,
        });
    }
});

module.exports = router;