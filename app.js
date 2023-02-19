const express = require('express')
const app = express()
const FS = require('fs')
const PATH = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const UUID = require('uuid')
const MULTER = require('multer')
const PORT = process.env.PORT || 1000
const dotenv = require('dotenv')
dotenv.config()

app.use(express.static(PATH.join(__dirname, './Public')))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const MYSQL = require('./MODULES/Conn')

const expDate = 1000 * 60 * 60 * 24 * 7
app.use(session({
  name: "E-Clearanc-System-Session",
  secret: UUID.v4(),
  resave: false,
  saveUninitialized: process.env.NODE_ENV === "production",
  cookie: {
    httpOnly: process.env.NODE_ENV === "production" ? false : true,
    maxAge: expDate, 
    secure: false,
    sameSite: true //'strict'
  }
}))

app.get('/Log-Out', (req, res) =>{
  req.session.destroy((err) => {
      if(err){
          return res.redirect('/')
      }else{
          res.clearCookie('E-Clearanc-System-Session')
          res.redirect('/')
      }
  })
})

const STUDENTLOGIN = (req, res, next) => {
  if(!req.session.STUDENTIN){
      res.redirect('/')
  }else{
      next()
  }
}

const PUSHIN = (req, res, next) => {
  if(req.session.STUDENTIN){
      res.redirect('/Student-Dashboard')
  }else{
      next()
  }
}

const ADMINLOG = (req, res, next) => {
  if(!req.session.ADMINLOGIN){
      res.redirect('/Admin/Login')
  }else{
      next()
  }
}

//STUDENT'S LOGIN PAGE
app.get('/', PUSHIN, (req, res) => {
  res.sendFile(PATH.join(__dirname, './Public/studentlogin.html'))
})
app.post('/', (req, res) => {
  const {MatricNo} = req.body
  const {Pwd} = req.body

  if(MatricNo,Pwd){
    const query = `SELECT * FROM students WHERE matric_no=?`
    MYSQL.query(query, [MatricNo],(err, Result) =>{
        if(Result.length > 0){
            if(Result[0].password == Pwd){
                req.session.STUDENTIN = MatricNo
                res.json({valid:'/Student-Dashboard'})
            }else{
                res.json({Notify:'Incorrect Password or Matric Number!'})
            }
        }else{
           res.json({Notify:'Invalid Matric Number!'}) 
        }
        
    })
  }
})

//CLEARANCE LETTER PAGE
const clearLetter = require('./MODULES/Clearance')
app.get('/Print-Clearance-Form', clearLetter,(req, res) => {})

//STUDENT'S DASHBOARD MANAGEMENT
app.get('/Student-Dashboard', STUDENTLOGIN, (req, res) => {
  res.sendFile(PATH.join(__dirname, './Public/studentdash.html'))
})

app.post('/Student-Dashboard', STUDENTLOGIN, (req, res) => {
  const {STUDENTIN} = req.session

  const {PayAmount} = req.body
  const {OldPwd} = req.body
  const {NewPwd} = req.body
  const {CNewPwd} = req.body

  const query = `SELECT * FROM students WHERE matric_no=?`
  MYSQL.query(query, [STUDENTIN],(err, StudentCol) =>{
    const query = `SELECT * FROM payment WHERE studentID=?`
    MYSQL.query(query, [StudentCol[0].ID],(err, PaymentCol) =>{
      const query = `SELECT * FROM fee WHERE dept=?`
      MYSQL.query(query,[StudentCol[0].dept],(err, Fees) =>{
        let TPFee = 0
        for (let i = 0; i < PaymentCol.length; i++) {TPFee += PaymentCol[i].amount}
        if(Fees[0].amount == TPFee){
          const query = `UPDATE students SET is_fee_approved=? WHERE matric_no=?`
          MYSQL.query(query,[1,STUDENTIN],(err, Result) =>{})
        }else{
          const query = `UPDATE students SET is_fee_approved=? WHERE matric_no=?`
          MYSQL.query(query,[0,STUDENTIN],(err, Result) =>{})
        }
        if(PayAmount){
            if(Number(PayAmount) < 5000){
              res.json({Notify:'Amount should above N5,000'})
            }else if(Number(PayAmount) <= Fees[0].amount-TPFee){//For Fee Payment
            let IDGene =''
            let possible="ABCDEF0123456789"
            for (let i=0; i<12; i++){
              IDGene += possible.charAt(Math.floor(Math.random()*possible.length))
            }
            let d = new Date()
            const Mth = d.getMonth()+1 < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1
            const Day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
            const Min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
            const Hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
            const Sec = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
          
            const PaidOn = `${d.getFullYear()}-${Mth}-${Day} ${Hour}:${Min}:${Sec}`

            const query = `INSERT INTO payment (feeID,studentID,fullname,matric_no,amount,datepaid) VALUES(?,?,?,?,?,?)`
            MYSQL.query(query,[IDGene,StudentCol[0].ID,StudentCol[0].fullname,StudentCol[0].matric_no,PayAmount,PaidOn],(err, Fees) =>{
              res.json({Pay:'/Student-Dashboard'})
            })

          }else if(Fees[0].amount-TPFee == 0){
            res.json({Notify:'No Outstanding Fee To Pay'})

          }else if(Number(PayAmount) > Fees[0].amount-TPFee){

            res.json({Notify:'Amount Higer Than Outstanding Fee'})
          }
        }else if(OldPwd,NewPwd,CNewPwd){
          if(NewPwd == CNewPwd){
            if(StudentCol[0].password == OldPwd){
              const query = `UPDATE students SET password=? WHERE matric_no=?`
              MYSQL.query(query,[NewPwd,STUDENTIN],(err, Fees) =>{
                res.json({Success:'/Student-Dashboard'})
              })  
            }else{
              res.json({PNoify:'Incorrect Old Password!'})
            }
          }else{
            res.json({PNoify:'Password Mismatched!'})
          }
        }else{
          res.json({STD:StudentCol,STDPay:PaymentCol,FEE:Fees})
        }
      })
    })
  })
  
})

//ADMINISTRTION SIDE
app.get('/Admin', (req, res) => {res.redirect('/Admin/Login')})
app.get('/Admin/Login', (req, res) => {res.sendFile(PATH.join(__dirname, './Public/Admin/adminlogin.html'))})
app.get('/Admin/Dashboard', ADMINLOG, (req, res) => {res.sendFile(PATH.join(__dirname, './Public/Admin/admindash.html'))})

app.post('/Admin/Login', (req, res) => {
  const {Username} = req.body
  const {Pwd} = req.body

  if(Username,Pwd){
    const query = `SELECT * FROM admin WHERE username=?`
    MYSQL.query(query, [Username],(err, Result) =>{
      if(Result.length > 0){
          if(Result[0].password == Pwd){
              req.session.ADMINLOGIN = Username
              res.send({success:'/Admin/Dashboard'})
          }else{
              Notify = 'Incorrect Password or Username!'
              res.send({Notify:'Incorrect Password or Username!'})
          }
      }else{
          Notify = 'Invalid Admin!'
          res.send({Notify:'Invalid Admin!'}) 
      }
    })
  }
})

app.post('/Admin/Dashboard', ADMINLOG, (req, res) => {
  const {ADMINLOGIN} = req.session

  const {ACTVIEW} = req.session

  const ActiveAdmin = req.body.ActiveDis
  const InActiveAdmin = req.body.DecDis
  const DeleteStd = req.body.DelStd

  const ClearStd = req.body.ClrStd
  const ClearCate = req.body.Cate

  const ActiveSide = req.body.ActiveSide

  const DeleteFee = req.body.DelFee

  const {NewAdmin} = req.body
  const {AdminFName} = req.body
  const {AdminPwd} = req.body
  const {AdminCPwd} = req.body
  const {Assign} = req.body
  const {Email} = req.body

  //CHANGE ADMIN PASSWORD
  const {AdOldPwd} = req.body
  const {AdNewPwd} = req.body
  const {AdCPwd} = req.body

  //ENTERING NEW FEES
  const {Year} = req.body
  const {FeeCollege} = req.body
  const {FeeDep} = req.body
  const {FeeAmount} = req.body

  //REGISTERING NEW STUDENT
  const {StdFullname} = req.body
  const {MatricNo} = req.body
  const {TelNo} = req.body
  const {SecYear} = req.body
  const {College} = req.body
  const {Dept} = req.body

  const query = `SELECT * FROM admin WHERE username=?`
  MYSQL.query(query, [ADMINLOGIN],(err, AdminCol) =>{
    const query = `SELECT * FROM admin`
    MYSQL.query(query, (err, Admins) =>{
      const query = `SELECT * FROM students`
      MYSQL.query(query, (err, Students) =>{
        const query = `SELECT * FROM fee`
        MYSQL.query(query, (err, Fees) =>{
          const query = `SELECT * FROM payment`
          MYSQL.query(query, (err, Payment) =>{
            if(NewAdmin,AdminFName,AdminPwd,AdminCPwd,Assign,Email){
              if(AdminPwd == AdminCPwd){
                console.log(NewAdmin,AdminFName,AdminPwd,AdminCPwd,Assign,Email)
                const query = `INSERT INTO admin (username,password,designation,fullname,email,status,photo) VALUES(?,?,?,?,?,?,?)`
                MYSQL.query(query,[NewAdmin,AdminPwd,Assign,AdminFName,Email,'Active','uploads/default.jpg'],(err, Fees) =>{
                  res.json({Success:'/Admin/Dashboard'})
                })
              }else{
                res.json({Notify:'Password Mismatched'})
              }

            }else if(ActiveSide){
              req.session.ACTVIEW = ActiveSide //Navigating To The Main Side Handle
              res.redirect('/Admin/Dashboard')

            }else if(ActiveAdmin){//Activation Of Admins
              const query = `UPDATE admin SET status=? WHERE ID=?`
              MYSQL.query(query,['Active',ActiveAdmin],(err, Fees) =>{res.redirect('/Admin/Dashboard')})  

            }else if(InActiveAdmin){//InActivation Of Admins
              const query = `UPDATE admin SET status=? WHERE ID=?`
              MYSQL.query(query,['InActive',InActiveAdmin],(err, Fees) =>{res.redirect('/Admin/Dashboard')})  

            }else if(StdFullname,MatricNo,TelNo,SecYear,College,Dept){
              /****************** NEW STUDENT REGISTRATION  ************************/
              const query = `INSERT INTO students (fullname,matric_no,password,session,faculty,dept,phone,photo,is_hostel_approved,is_sport_approved,is_stud_affairs_approved) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
              MYSQL.query(query,[StdFullname,MatricNo,'12345',SecYear,College,Dept,TelNo,'uploads/default.jpg',0,0,0],(err, Fees) =>{
                if (err == `Error: ER_DUP_ENTRY: Duplicate entry '${MatricNo}' for key 'matric_no'`){
                  res.json({Notify:'Matric Number Already Registered!'})
                }else{
                  res.json({Success:'/Admin/Dashboard'})
                }
              })
                                 
            }else if(DeleteStd){//DELETING OF STUDENTS DATA
              const query = `DELETE FROM students WHERE matric_no=?`
              MYSQL.query(query,[DeleteStd],(err, Fees) =>{res.redirect('/Admin/Dashboard')})

            }else if(ClearStd,ClearCate){//CLEARING OF STUDENT
              const query = `UPDATE students SET ${ClearCate}=? WHERE matric_no=?`
              MYSQL.query(query,[1,ClearStd],(err, Result) =>{res.redirect('/Admin/Dashboard')})
              
            }else if(DeleteFee){
              const query = `DELETE FROM fee WHERE dept=?`
              MYSQL.query(query,[DeleteFee],(err, Result) =>{res.redirect('/Admin/Dashboard')})

            }else if(Year,FeeCollege,FeeDep,FeeAmount){//FOR ADDING OF NEW FEE
              const query = `INSERT INTO fee (session,faculty,dept,amount) VALUES(?,?,?,?)`
              MYSQL.query(query,[Year,FeeCollege,FeeDep,FeeAmount],(err, Result) =>{
                if (err == `Error: ER_DUP_ENTRY: Duplicate entry '${FeeDep}' for key 'dept'`){
                  res.json({Notify:'Fee For This Department Already Exist!'})
                }else{
                  res.json({Success:'/Admin/Dashboard'})
                }
              })

            }else if(AdOldPwd,AdNewPwd,AdCPwd){//CHANGING OF ADMIN PASSWORD
              if(AdNewPwd == AdCPwd){
                if(AdminCol[0].password == AdOldPwd){
                  const query = `UPDATE admin SET password=? WHERE username=?`
                  MYSQL.query(query,[AdNewPwd,ADMINLOGIN],(err, Fees) =>{
                    res.json({Success:'/Admin/Dashboard'})
                  })  
                }else{
                  res.json({Notify:'Incorrect Old Password!'})
                }
              }else{
                res.json({Notify:'Password Mismatched!'})
              }

            }else{
              res.json({ADM:AdminCol,ADMIN:Admins,STUDENTS:Students,FEES:Fees,PAYMENTS:Payment,ACTIVE:ACTVIEW})
            }
          })
        })
      })
    })
  })
  

})

app.listen(PORT, () => {  console.log(`listening on ${PORT}`) })