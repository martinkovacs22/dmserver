const express = require("express");
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));  
app.use(express.json());
const pool  = mysql.createConnection({
    connectionLimit: 10,

    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'melov._1'
})

pool.connect();
// Get all beers
app.get('/api/getMenu', (req, res) => {
        pool.query(`SELECT * from menualap`, (err, rows) => {
            res.send(rows);
        })
    })
    app.post('/api/setMenu', (req, res) => {

        const kosar = req.body.rendelttermek
        const nev = req.body.nev
        const cim = req.body.cim
        console.log("neve--------------------------------------"+nev+ "-----------");
        console.log(kosar,nev,cim);
        const ossz = ()=>{
            var ossz= '';
            for (let i = 0; i < kosar.length; i++) {
                ossz += kosar[i]+";"
            }
            console.log(ossz);
            return ossz;
        }
        const sqlInset = "INSERT INTO rendelesek( nev, cim, tartalom) VALUES (?,?,?)"
        
        pool.query(sqlInset,[nev,cim,ossz()] , (err, rows) => {
        
            if (err) {
               console.log(err); 
            }else{
                console.log("siker");
            }
            
        })
    })



app.listen(3001, ()=>{console.log(3001+" port");})