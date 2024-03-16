const express = require("express"); 
const Sequelize = require("sequelize"); //เพราะเราจะใช้สร้างฐานข้อมูลให้ง่ายขึ้น
const app = express(); 

app.use(express.json());

const sequelize = new Sequelize('database','username','password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Music.sqlite' 
});
//สร้าง Tableเพลงไทย
const Thai = sequelize.define('thais',{
    rating:{ //อันดับ
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    artist:{ //ชื่อศิลปิน
        type: Sequelize.STRING,
        allowNull: false
    },
    song:{ //ชื่อเพลง
        type:Sequelize.STRING,
        allowNull:false
    }
});

//สร้าง Tableเพลงเกาหลี
const  Korea = sequelize.define('koreas',{
    rating:{ //อันดับ
        type: Sequelize.INTEGER, // ข้อมูล เป็นรูป int
        autoIncrement: true, // ถ้าไม่ใส่ข้อมูลลงไป ก็จะใส่ข้อมูลอัตโนมัติให้ intก็คือใส่ตัวเลขมาให้
        primaryKey: true //กำหนดให้ id เป็น PrimaryKey(ทั้งชุดข้อมูลมีอะไรบ้าง ไม่ช้ำกัน)
    },
    artist:{ //ศิลปิน
        type: Sequelize.STRING, //ข้อมูล เป็นstring
        allowNull: false // ถ้าไม่เพิ่มข้อมุลลงใน name ก็จะ error
    },
    song:{ //เพลง
        type:Sequelize.STRING, //ข้อมูล เป็นstring
        allowNull : false // ถ้าไม่เพิ่มข้อมุลลงใน name ก็จะ error
    }
});

//สร้าง Tableเพลงอังกฤษ
const  England = sequelize.define('Englands',{
    rating:{ //อันดับ
        type: Sequelize.INTEGER, // ข้อมูล เป็นรูป int
        autoIncrement: true, // ถ้าไม่ใส่ข้อมูลลงไป ก็จะใส่ข้อมูลอัตโนมัติให้ intก็คือใส่ตัวเลขมาให้
        primaryKey: true //กำหนดให้ id เป็น PrimaryKey(ทั้งชุดข้อมูลมีอะไรบ้าง ไม่ช้ำกัน)
    },
    artist:{ //ศิลปิน
        type: Sequelize.STRING, //ข้อมูล เป็นstring
        allowNull: false // ถ้าไม่เพิ่มข้อมุลลงใน name ก็จะ error
    },
    song:{ //เพลง
        type:Sequelize.STRING, //ข้อมูล เป็นstring
        allowNull:false // ถ้าไม่เพิ่มข้อมุลลงใน name ก็จะ error
    }
});
sequelize.sync();

// Get -> ดึงข้อมูล ทั้งหมดมาดู
app.get('/Thais',(req, res) =>{
    Thai.findAll().then(Thais => {  //findAll เพราะเราเรียกดูทั้งหมด
        res.json(Thais);
    }).catch(err => {
        res.status(500).send(err);
    });
});
// Get -> ดึงข้อมูลมาดู แค่เฉพาะ อันเดียว
app.get('/Thais/:id',(req,res) =>{  //-> '/This/ ต้องมี / ด้วย
    Thai.findByPk(req.params.id).then(Thais =>{  //findByPk เพราะเราเรียกดูแค่ Pkตัวเดียว
        res.json(Thais);
    }).catch(err => {
        res.status(500).send(err);
    });
});
// Post -> เพิ่มข้อมูล
app.post('/Thais',(req, res) =>{
    Thai.create(req.body).then(book => {
        res.send(book);
    }).catch(err => {
            res.status(500).send(err);
        });
    });
// Put -> update แก้ไข
app.put('/Thais/:id',(req,res) => {
    Thai.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() =>{
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Thais/:id',(req,res) => {
    Thai.findByPk(req.params.id).then(book => {
        if (!book){
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});//ไทย

app.get('/Englands',(_req,res) =>{
    England.findAll().then(Englands =>{
        res.json(Englands);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Englands:id',(req,res) =>{
    England.findAll(req.params.id).then(Englands =>{
        res.json(Englands);
    }).catch(err => {
        res.status(500).send(err);
    });
});
app.post('/Englands',(req, res) =>{
    England.create(req.body).then(book => {
        res.send(book);
    }).catch(err => {
            res.status(500).send(err);
        });
    });

app.put('/Englands/:id',(req,res) => {
    England.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() =>{
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Englands/:id',(req,res) => {
    England.findByPk(req.params.id).then(book => {
        if (!book){
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});//อังกฤษ

app.get('/Koreas',(_req,res) =>{
    Korea.findAll().then(Koreas =>{
        res.json(Koreas);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Koreas:id',(req,res) =>{
    Korea.findAll(req.params.id).then(Koreas =>{
        res.json(Koreas);
    }).catch(err => {
        res.status(500).send(err);
    });
}); 

app.post('/Koreas',(req, res) =>{
    Korea.create(req.body).then(book => {
        res.send(book);
    }).catch(err => {
            res.status(500).send(err);
        });
    });

app.put('/Koreas/:id',(req,res) => {
    Korea.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() =>{
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Koreas/:id',(req,res) => {
    Korea.findByPk(req.params.id).then(book => {
        if (!book){
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
}); //เกาหลี

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
