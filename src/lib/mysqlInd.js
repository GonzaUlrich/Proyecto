//mysql
const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user: 'root',
    password: '',
    database: 'proyectofinano'
});

//Get
app.get('',(req,res) =>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        
        connection.query('SELECT * from fotos', (err,rows)=>{
            connection.release();

            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});
//Set new
app.post('',(req,res) =>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const params = req.body;
        
        connection.query('INSERT INTO fotos SET ?',params , (err,rows)=>{
            connection.release();

            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});
//Chage
app.put('',(req,res) =>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const {id, name,lastname,img,imgLowSize,imgBigSize,description} = req.body;
        
        connection.query('UPDATE fotos SET name= ? WHERE id= ?',[name,id] , (err,rows)=>{
            connection.release();

            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});