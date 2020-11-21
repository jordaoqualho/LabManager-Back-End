const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require("./routes/routes")
const cors = require('cors')
 
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'),() => {
    console.log("Servidor rodando na porta " + app.get('port'))
});
