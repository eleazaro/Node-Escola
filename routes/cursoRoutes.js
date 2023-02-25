const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');
const Matricula = require('../models/matricula');

router.use(express.json());

router.get("/:id", (req, resp) => {
    try {
        Curso.findByPk(req.params.id).then((curso) => {
            resp.status(200).json({
                statusCode: 200,
                data: curso,
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
        Curso.findByPk(req.params.id).then((curso) => {
            curso.update(req.body).then((updated) => {
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
        Curso.findAll().then((cursos) => {
            resp.status(200).json({
                statusCode: 200,
                data: cursos,
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
        Curso.create(req.body).then((curso) => {
            resp.status(200).json({
                statusCode: 200,
                data: curso,
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
    const idCurso = req.params.id;
    try {
        Matricula.findAll({
            where: { id_curso: idCurso }
        }).then((matriculas) => {
            if (matriculas.length == 0) {
                Curso.destroy({
                    where: { id: idCurso }
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