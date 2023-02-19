const express = require('express')
const app = express()
const session = require('express-session')
const MYSQL = require('./Conn')

const clearLetter = (req,res) => {

    const {STUDENTIN} = req.session

    if(STUDENTIN){
        const query = `SELECT * FROM students WHERE matric_no=?`
        MYSQL.query(query, [STUDENTIN],(err, Result) =>{
        const NotCleared =  `<div class="notcleared" style="height: 75vh;display:flex;justify-content:center;align-items:center;">
                                <h1>Sorry, You have Not Been Cleared To Obtain This Letter</h1>
                            </div>`
    
        const Cleared = `<div class="text-center article-title">
                    <h1 class="cert">MICHAEL OKPARA UNIVERSITY OF AGRICULTURE UMUDIKE, ABIA STATE</h1>
                    <img src="./images/logo.png" width="157" height="175">
                        </div>
                        <p class="style1"><u>CLEARANCE LETTER</u></p>
                        <p align="justify">This is to certify that <b>${Result[0].fullname}</b>, have been cleared by the following departments:</p>
                        <div align="justify">
                            <ul>
                            <li>Hostel </li>
                            <li>Student Affairs</li>
                            <li>Sport </li>
                            <li>Bursary </li>
                            </ul>
                        </div>
                        <p align="justify">Full Details Remains:</p>
                        <p align="justify"><strong>FULLNAME:</strong> ${Result[0].fullname}</p>
                        <p align="justify"><strong>MATRIC NUMBER:</strong> ${Result[0].matric_no}</p>
                        <p align="justify"><strong>COLLEGE:</strong> ${Result[0].faculty}</p>
                        <p align="justify"><strong>DEPARTMENT:</strong> ${Result[0].dept}</p>
                        <p align="justify">&nbsp;</p>
                        <p align="justify">
                            This letter will allow you process for convocation and National Youth Service Corp (NYSC) and any other if need arise. we wish you best of luck.</p>
                        <div style="position:relative">
                        <p align="right" class="style2">SIGNED, REGISTRA</p>
                        <p align="right" style="font:bolder 25px Holimount;"><strong>Prof. Jacinta Eluwa</strong></p>
                        <div style="position:absolute; top:0; z-index: 0; opacity: 0.3; right:20px; width:70px; height:70px;"><img src="./uploads/signature.png" alt="" style="width:70px; height:70px;"></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div align="center"><a href="#" id="print-button" onclick="window.print();return false;">Print this page</a> </div>
                        </div>`
    
        let Status = NotCleared
    
        if(Result[0].is_hostel_approved==1&&Result[0].is_sport_approved==1&&Result[0].is_stud_affairs_approved==1&&Result[0].is_fee_approved==1){Status = Cleared}
    
        const ClearanceLetter = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Clearance Letter | MOUAU</title>
            <link href="css/bootstrap.min.css" rel="stylesheet">
            <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
            <link href="css/plugins/toastr/toastr.min.css" rel="stylesheet">
            <link href="css/animate.css" rel="stylesheet">
            <link href="css/style.css" rel="stylesheet">
            <style>
                .cert{
                color:green !important;
                font-size: 30px !important;
                font-family: cinzel;
            }
            .style1 {
                font-size: 18px !important;
                font-weight: bold;
                font-family: Algerian;
                letter-spacing: 1.5px;
                text-align:center;
                margin-top:-70px !important;
            }
            .style2 {font-weight: bold}
            .water_mark {
                position: absolute;
                top: 65%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: -1;
            }
            .water_mark img{
                height: 100%;
                width: 100%;
                opacity:0.1;
            }
            .wrapper-content, .row{
                height: 0;
            }
            .ibox-content{
                background-color: rgba(255, 255, 255, 0.925);
            }
            </style>
        </head>
        <body>
        <div class="wrapper wrapper-content  animated fadeInRight article">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                    <div class="ibox">
                        <div class="water_mark">
                            <img src="./uploads/signature.png" alt="">
                        </div>
                        <div class="ibox-content">
                            ${Status}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <script src="js/jquery-2.1.1.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
            <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
            <script src="js/inspinia.js"></script>
            <script src="js/plugins/pace/pace.min.js"></script>
        </body>
        </html>
        `
        res.send(ClearanceLetter)
        })
    }else{
        res.redirect('/Student-Dashboard')
    }
}

module.exports = clearLetter