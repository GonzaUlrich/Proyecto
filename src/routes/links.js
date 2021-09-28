const express = require ('express');
const { SanitizersImpl } = require('express-validator/src/chain');
const router = express.Router();
const pool  = require('../database');
const fileUpload = require('express-fileupload');



//Data File
const newData= {id:0, fname:'0', lastname:'0', imgUrl:'0', description:'0', user_id:1};

router.use(fileUpload());

router.get('/user', (req,res)=>{
    res.render('links/user');
});

router.post('/user', async (req,res)=>{
    const {username, password} = req.body;
    const newUser= {
        username, 
        password
    };
    await pool.query ('INSERT INTO usuarios set ?', [newUser])
    res.render('links/add');
});


/////////////////

router.get('/add', (req,res)=>{
    res.render('links/add');
});

router.post('/add', async (req,res)=>{
    const {tempfname, templastname, tempdescription} = req.body;
    newData.fname= tempfname;
    newData.lastname= templastname;
    newData.description= tempdescription;
    if(newData.imgUrl==='0' || newData.fname==='0'){
        
    }else{
        await pool.query ('INSERT INTO fotos set ?', [newData])
        newData.imgUrl='0';
        newData.fname='0';
        res.redirect('mosaico');
    }
    
});

router.post('/image', async (req,res)=>{
    console.log(2);
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // name of the input is sampleFile

    sampleFile = req.files.sampleFile;
    let changeDirPath = __dirname.replace("routes",'');
    let randomValue1 = Math.floor((Math.random() * 9999999) + 1);
    let randomValue2 = Math.floor((Math.random() * 9999999) + 1);

    uploadPath = changeDirPath + '/uploadImages/fullImage/' + sampleFile.name + randomValue1 + randomValue2 +".jpg";
    
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    newData.imgUrl = sampleFile.name + randomValue1 + randomValue2 +".jpg";
    if(newData.imgUrl==='0' || newData.fname==='0'){
        
    }else{
        await pool.query ('INSERT INTO fotos set ?', [newData])
        newData.imgUrl='0';
        newData.fname='0';
        res.redirect('mosaico');
    }
    
});

router.get('/mosaico', async(req,res)=>{
    const data = await pool.query('SELECT * FROM fotos' );
    res.render('links/mosaico', { data});
});

router.get('/adminmosaico174', async(req,res)=>{
    const data = await pool.query('SELECT * FROM fotos' );
    res.render('links/adminmosaico174', { data});
});



router.get('/', async (req,res)=>{
    const data = await pool.query('SELECT * FROM fotos' );
    res.render('links/mosaico', {data} )
});

router.get('/delete/:id',async (req,res) =>{
    const {id} = req.params;
    console.log([id]);
    const data = await pool.query('SELECT * FROM fotos WHERE id ='+[id] );
    console.log(data[0].imgUrl);
    var imagePath = __dirname;
    for(var i=0;i<6;i++){
        imagePath = imagePath.substring(0,imagePath.length-1);
    }
    imagePath+="uploadImages/fullImage/" +data[0].imgUrl;
    var fs = require('fs');
    fs.unlinkSync(imagePath);
    //get variable from database to delete
    
    await pool.query('DELETE FROM fotos WHERE ID = ?', [id]);
    res.redirect('/links/adminmosaico174');
});

router.post('', (req,res)=>{
    
    img = req.files.img;
});


module.exports= router;