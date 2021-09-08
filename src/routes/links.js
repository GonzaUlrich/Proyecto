const express = require ('express');
const { SanitizersImpl } = require('express-validator/src/chain');
const router = express.Router();
const pool = require('../database');
const fileUpload = require('express-fileupload');

//Data File
const newData= {id:0, fname:'0', lastname:'0', imgLowSize:'0', imgBigSize:'0', description:'0', user_id:0};

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
    console.log(newData);
    //await pool.query ('INSERT INTO fotos set ?', [newData])
    //res.redirect('/links');
});

router.post('/image', (req,res)=>{
    
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
  
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    let changeDirPath = __dirname.replace("routes",'');

    console.log(changeDirPath);
    uploadPath= changeDirPath + '/uploadImages/fullImage/' + sampleFile.name;
  
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
      //if (err) return res.status(500).send(err);


        
    });
    console.log('lesto2');

    //Save big img path
    

    //Save shrink img path

    //Compress img in 2 files

    //Save big img file 

    //Save shrink img file 

    //Post img path in db
    let ulpoadpathBigImg;
    let ulpoadpathShrinkImg;
});

router.get('/', async (req,res)=>{
    const data = await pool.query('SELECT * FROM fotos' );
    console.log(data);
    res.render('links/mosaico', {data})
});

router.get('/delete/:id',async (req,res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM fotos WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.post('', (req,res)=>{
    
    img = req.files.img;
    console.log(img);
});


module.exports= router;