const NavBtn = ['DashBtn','AddUser','UserRec','RegStd','StdRec','StdClr','AddFee','PayHist','ChngPwd'];
const ShowDis = ['DashDis','AddUserDis','UserRecDis','RegStdDis','StdRecDis','StdClrDis','AddFeeDis','PayHistDis','ChngPwdDis'];
for (let i = 0; i < NavBtn.length; i++) {
    $(`.${NavBtn[i]}`).on('click', () => {
        $('.ActiveSide').val(ShowDis[i])
        $('.actsd').submit()
        setTimeout(() => {
            for (let n = 0; n < NavBtn.length; n++) {if(NavBtn[i] !== NavBtn[n]){$(`.${ShowDis[n]}`).hide()}}
            $(`.${ShowDis[i]}`).show()
        }, 2000);
    })
}
$.ajax({
    method:"POST",
    success: (data) => {
        if(data.ACTIVE){
            $(`.DashDis`).hide()
            $(`.${data.ACTIVE}`).show()
        }else{
            $(`.DashDis`).show()
        }
        if(data.ADM){
            $('.info a').html(data.ADM[0].username)
        }
        // ADMINISTRATORS SIDE
        if(data.ADMIN){
            $('.adm_no').html(data.ADMIN.length)
            const show = document.querySelector('.AllAdmin')
            for (let i = 0; i < data.ADMIN.length; i++) {
                let Status = `<a class="dropdown-item Deactive${data.ADMIN[i].ID}" href="#">Deactive</a>`
                if(data.ADMIN[i].status == 'InActive'){
                    Status = `<a class="dropdown-item Active${data.ADMIN[i].ID}" href="#">Activate</a>`
                }
                show.innerHTML += `
                <tr class="gradeX">
                    <td height="47"><div align="center">1</div></td>
                    <td><div align="center">${data.ADMIN[i].username}</div></td>
                    <td><div align="center"><span class="controls"><img src="../${data.ADMIN[i].photo}"  width="50" height="43" border="2"/></span></div></td>
                    <td><div align="center">${data.ADMIN[i].password}</div></td>
                    <td><div align="center">${data.ADMIN[i].designation}</div></td>
                    <td><div align="center">${data.ADMIN[i].fullname}</div></td>
                    <td><div align="center">${data.ADMIN[i].email}</div></td>
                    <td><div align="center">${data.ADMIN[i].status}</div></td>
                    <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger btn-flat">Action</button>
                        <button type="button" class="btn btn-danger btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown">
                        <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu" role="menu">${Status}</div>
                    </div>
                    </td>
                </tr>
                `
            }
            for (let i = 0; i < data.ADMIN.length; i++) {
                $(`.Active${data.ADMIN[i].ID}`).on('click', () => {
                    $('.ActiveDis').val(data.ADMIN[i].ID)
                    $('.ActiveForm').submit()
                })
                $(`.Deactive${data.ADMIN[i].ID}`).on('click', () => {
                    $('.DecDis').val(data.ADMIN[i].ID)
                    $('.InActiveForm').submit()
                })
            }
            
        }
        
        // STUDENTS SIDE
        if(data.STUDENTS){
            $('.std_no').html(data.STUDENTS.length)
            const show = document.querySelector('.std_list')
            const ShowFullStd = document.querySelector('.StudentRecord')
            const ShowStdRec = document.querySelector('.StdClearancrec')

            const hostel = []
            const sport = []
            const studaffair = []
            const l = data.STUDENTS.length-1
            for (let i = 0; i < data.STUDENTS.length; i++) {
                show.innerHTML += `
                    <li>
                        <img src="../uploads/default.jpg" alt="students Image" class="StImg">
                        <a class="users-list-name" href="#">${data.STUDENTS[l-i].fullname}</a>
                        <span class="users-list-date">${data.STUDENTS[l-i].matric_no}</span>
                    </li>
                `
                //FOR SHOWING STUDENTS RECORD
                ShowFullStd.innerHTML += `
                <tr class="gradeX">
                    <td height="104"><div align="center">${data.STUDENTS[i].fullname}</div></td>
                    <td><div align="center"><span class="controls"><img src="../uploads/default.jpg"  width="91" height="73" border="2"/></span></div></td>
                    <td><div align="center">${data.STUDENTS[i].phone}</div></td>
                    <td><div align="center">${data.STUDENTS[i].matric_no}</div></td>
                    <td><div align="center">${data.STUDENTS[i].password}</div></td>
                    <td><div align="center">${data.STUDENTS[i].faculty}</td>
                    <td><div align="center">${data.STUDENTS[i].dept}</div></td>
                    <td>
                    <div class="btn-group">
                    <button type="button" class="btn btn-danger btn-flat Del${data.STUDENTS[i].ID}"><a style="color:white" href="#">Delete</a></button>
                    </div>
                    </td>
                </tr>
                `
                //FOR SHOWING STUDENTS CLEARANCE RECORD
                hostel.push(data.STUDENTS[i].is_hostel_approved)
                sport.push(data.STUDENTS[i].is_sport_approved)
                studaffair.push(data.STUDENTS[i].is_stud_affairs_approved)

                const clear = '<div align="center"><span class="badge badge-success">Cleared</span></div>'
                const pending = `<div align="center" class="Clear${data.STUDENTS[i].ID}"><a href="#"><i class="fa fa-check" title="Click to Clear Student"><span class="badge badge-warning">Pending</span></i></a></div>`
                let HostelStatus = clear
                let SportStatus = clear
                let AffairsStatus = clear
                if(hostel[i] == 0){
                    HostelStatus = pending
                }
                if(sport[i] == 0){
                    SportStatus = pending
                }
                if(studaffair[i] == 0){
                    AffairsStatus = pending
                }
                ShowStdRec.innerHTML +=`
                <tr class="gradeX">
                    <td height="104"><div align="center">${data.STUDENTS[i].fullname}</div></td>
                    <td><div align="center"><span class="controls"><img src="../uploads/default.jpg"  width="91" height="73" border="2"/></span></div></td>
                    <td><div align="center">${data.STUDENTS[i].matric_no}</div></td>
                    <td class="hostel">
                        ${HostelStatus}
                    </td>
                    <td class="sport">
                        ${SportStatus}
                    </td>
                    <td class="affairs">
                        ${AffairsStatus}
                    </td>
                `
            }
                //FOR DELETING STUDENTS RECORD AND CLEARING OF STUDENTS
                for (let i = 0; i < data.STUDENTS.length; i++) {
                    $(`.Del${data.STUDENTS[i].ID}`).on('click', () => {
                        $('.DelStd').val(data.STUDENTS[i].matric_no)
                        $('.DelStdForm').submit()
                    })

                    $(`.hostel .Clear${data.STUDENTS[i].ID}`).on('click', () => {
                        $('.ClrStd').val(data.STUDENTS[i].matric_no)
                        $('.Cate').val('is_hostel_approved')
                        $('.ClrStdForm').submit()

                    })
                    $(`.sport .Clear${data.STUDENTS[i].ID}`).on('click', () => {
                        $('.ClrStd').val(data.STUDENTS[i].matric_no)
                        $('.Cate').val('is_sport_approved')
                        $('.ClrStdForm').submit()
                    })
                    $(`.affairs .Clear${data.STUDENTS[i].ID}`).on('click', () => {
                        $('.ClrStd').val(data.STUDENTS[i].matric_no)
                        $('.Cate').val('is_stud_affairs_approved')
                        $('.ClrStdForm').submit()
                    })
                }

            
        }

        // PAYMENT OF FEES STRUCTURE
        if(data.FEES){
            const show = document.querySelector('.FeeStructure')
            for (let i = 0; i < data.FEES.length; i++) {
                show.innerHTML += `
                <tr class="gradeX">
                    <td height="47"><div align="center">${i+1}</div></td>
                    <td><div align="center">${data.FEES[i].faculty}</div></td>
                    <td><div align="center">${data.FEES[i].dept}</div></td>
                    <td><div align="center">${data.FEES[i].session}</div></td>
                    <td><div align="center">NGN${data.FEES[i].amount.toLocaleString()}</div></td>
                    <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger btn-flat">Action</button>
                        <button type="button" class="btn btn-danger btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown">
                        <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu" role="menu">
                        <a class="dropdown-item DelFee${data.FEES[i].ID}" href="#">Delete</a>
                        </div>
                    </div>
                    </td>
                </tr>
                `
            }
            //FOR DELETING OF FEES
            for (let i = 0; i < data.FEES.length; i++) {
                $(`.DelFee${data.FEES[i].ID}`).on('click', () => {
                    $('.DelFee').val(data.FEES[i].dept)
                    $('.DelFeeForm').submit()
                })
            }

        }

        // PAYMENT HISTORY
        if(data.PAYMENTS){
            const ShowDis = document.querySelector('.PayHistRec')
            let TPay = 0
            for (let i = 0; i < data.PAYMENTS.length; i++) {
                TPay += data.PAYMENTS[i].amount

                ShowDis.innerHTML +=`
                <tr class="gradeX">
                    <td><div align="center">${data.PAYMENTS[i].feeID}</div></td>
                    <td><div align="center">${data.PAYMENTS[i].fullname}</div></td>
                    <td><div align="center"><span class="controls"><img src="../uploads/default.jpg"  width="91" height="73" border="2"/></span></div></td>
                    <td><div align="center">NGN${data.PAYMENTS[i].amount.toLocaleString()}</div></td>
                    <td><div align="center">${data.PAYMENTS[i].matric_no}</div></td>
                    <td><div align="center">${data.PAYMENTS[i].datepaid}</div></td>
                </tr>
                `
            }
            $('.tol_pay span').html(TPay.toLocaleString())

        }
    }
})

//ADDING NEW ADMIN
$('.NewAdmin').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        data: {
            NewAdmin: $('.username').val(),
            AdminFName: $('.fullname').val(),
            AdminPwd: $('.pwd').val(),
            AdminCPwd: $('.cpwd').val(),
            Assign: $('.assign').val(),
            Email: $('.email').val(),
        },
        success: (data) => {
            if(data.Success){
                window.location.href = data.Success
            }
            $('.NewUNotify').html(data.Notify)
            setTimeout(() => {
                $('.NewUNotify').html('')
            }, 3000)
        },
        error: (err) => {
            console.log(err)
        }
    })
})
//ADDING NEW STUDENT
$('.NewStdReg').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        data: {
            StdFullname: $('.stdfullname').val(),
            MatricNo: $('.matric_no').val(),
            TelNo: $('.tel_no').val(),
            SecYear: $('.session').val(),
            College: $('.college').val(),
            Dept: $('.dept').val(),
        },
        success: (data) => {
            if(data.Success){
                window.location.href = data.Success
            }
            $('.NewStdNote').html(data.Notify)
            setTimeout(() => {
                $('.NewStdNote').html('')
            }, 3000)
        },
        error: (err) => {
            console.log(err)
        }
    })
})
//ADDING NEW FEES
$('.NewFeeForm').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        data: {
            Year: $('.fee_session').val(),
            FeeCollege: $('.fee_college').val(),
            FeeDep: $('.fee_dept').val(),
            FeeAmount: $('.feeamt').val()
        },
        success: (data) => {
            if(data.Success){
                window.location.href = data.Success
            }
            $('.AddFeeNote').html(data.Notify)
            setTimeout(() => {
                $('.AddFeeNote').html('')
            }, 3000)
        },
        error: (err) => {
            console.log(err)
        }
    })
})
//CHANGING AN ADMIN PASSWORD
$('.AdminNewPwd').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        data: {
            AdOldPwd: $('.AdOld').val(),
            AdNewPwd: $('.Adpwd').val(),
            AdCPwd: $('.AdCpwd').val(),
        },
        success: (data) => {
            if(data.Success){
                window.location.href = data.Success
            }
            $('.AdNote').html(data.Notify)
            setTimeout(() => {
                $('.AdNote').html('')
            }, 3000)
        },
        error: (err) => {
            console.log(err)
        }
    })
})

//COLLEGES AND DEPARTMENTS
const College = [
    'College Of Engineering and Engineering Technology',
    'College Of Physical and Applied Science',
    'College of Agricultural Economics, Rural Sociology & Extension',
    'College Of Animal Science & Animal Production',
    'College Of Applied Food Science & Tourism',
    'College Of Crop & Soil Sciences',
    'College Of Management Science',
    'College Of Natural Science',
    'College Of Natural Resources & Environmental Management',
    'College Of Veterinary Medicine',
    'College Of Education'
]
const Dept = [
    `
    <option value="Electrical and Elecronic Engineering">Electrical and Elecronic Engineering</option>
    <option value="Mechanical Engineering">Mechanical Engineering</option>
    <option value="Civil Engineering">Civil Engineering</option>
    <option value="Chemical Engineering">Chemical Engineering</option>
    <option value="Computer Engineering">Computer Engineering</option>
    `,
    `
    <option value="Computer Science">Computer Science</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Statistic">Statistic</option>
    `,
    `
    <option value="Agribusiness and Management">Agribusiness and Management</option>
    <option value="Agricultural Economics">Agricultural Economics</option>
    <option value="Agricultural Extension and Rural Sociology">Agricultural Extension and Rural Sociology</option>
    `,
    `
    <option value="Animal Breeding And Physiology">Animal Breeding And Physiology</option>
    <option value="Animal Nutrition And Forage Science">Animal Nutrition And Forage Science</option>
    <option value="Animal Production and Livestock Management">Animal Production and Livestock Management</option>
    `,
    `
    <option value"Human Nutrition and Dietetics">Human Nutrition and Dietetics</option>
    <option value"Home Science/Hospitality Management & Tourism">Home Science/Hospitality Management & Tourism</option>
    <option value"Food Science and Technology">Food Science and Technology</option>
    `,
    `
    <option value"Agronomy">Agronomy</option>
    <option value"Plant Health Management">Plant Health Management</option>
    <option value"Soil Science and Meteorology">Soil Science and Meteorology</option>
    `,
    `
    <option value"Accounting Department">Accounting Department</option>
    <option value"Banking and Finance">Banking and Finance</option>
    <option value"Business Administration">Business Administration</option>
    <option value"Economics Department">Economics Department</option>
    <option value"Entrepreneurial Studies">Entrepreneurial Studies</option>
    <option value"Industrial Relations and Personnel Management">Industrial Relations and Personnel Management</option>
    <option value"Human Resource Management">Human Resource Management</option>
    <option value"Marketing Department">Marketing Department</option>
    `,
    `
    <option value"Biochemistry">Biochemistry</option>
    <option value"Microbiology">Microbiology</option>
    <option value"Plant Science and Biotechnology">Plant Science and Biotechnology</option>
    <option value"Zoology and Environmental Biology">Zoology and Environmental Biology</option>
    `,
    `
    <option value"Environment Management and Toxicology">Environment Management and Toxicology</option>
    <option value"Fisheries and Aquatic Resources Management">Fisheries and Aquatic Resources Management</option>
    <option value"Forestry and Environmental Management">Forestry and Environmental Management</option>
    `,
    `
    <option value"Theriogenology">Theriogenology</option>
    <option value"Veterinary Anatomy">Veterinary Anatomy</option>
    <option value"Veterinary Medicine">Veterinary Medicine</option>
    <option value"Veterinary Microbiology">Veterinary Microbiology</option>
    <option value"Veterinary Public Health and Preventive Medicine">Veterinary Public Health and Preventive Medicine</option>
    <option value"Veterinary Surgery and Radiology">Veterinary Surgery and Radiology</option>
    `,
    `
    <option value"Computer Science Education">Computer Science Education</option>
    <option value"Industrial Education">Industrial Education</option>
    <option value"Physics Education">Physics Education</option>
    <option value"Chemistry Education">Chemistry Education</option>
    <option value"Mathematics Education">Mathematics Education</option>
    <option value"Agric Education">Agric Education</option>
    `,
]
const SelectDept = document.querySelector('.showdept')
const SelectDept1 = document.querySelector('.showdept1')

$('.college').on('change', () => {
    for (let i = 0; i < College.length; i++) {
        if($('.college').val() == College[i]){
            SelectDept.innerHTML = Dept[i]
        }
    }
})

$('.fee_college').on('change', () => {
    for (let i = 0; i < College.length; i++) {
        if($('.fee_college').val() == College[i]){
            SelectDept1.innerHTML = Dept[i]
        }
    }
})