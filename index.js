const express = require('express');
const app = express();
const database = require('./db');
const cursoRoute = require('./routes/cursoRoutes');
const alunoRoute = require('./routes/alunoRoutes');
const matriculaRoute = require('./routes/matriculaRoute');

(async () => {
    try {
        await database.sync();
    } catch (error) {
        console.log(error);
    }
})();

app.use('/cursos', cursoRoute);
app.use('/alunos', alunoRoute);
app.use('/matricula', matriculaRoute);
app.use(express.json());

app.get("/", (req, resp) => {
    resp.send("Test server OK");
});

app.listen(3000, () => {
    console.log("Server on...");
})

module.exports = app;