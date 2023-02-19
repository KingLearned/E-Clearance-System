//NAVIGATION TO DIFFERENT SECTON IN STUDENTS DASHBOARD
document.querySelectorAll('.navList').forEach(Ele => {
    Ele.addEventListener('click', () => {
        document.querySelectorAll('.navList').forEach(Elem => {$(`.${Elem.id}`).hide()})
        $(`.${Ele.id}`).show()
    })
})

$.ajax({
    method:"POST",
    success: (data) => {
        if(data.STD){
            $('.welcome-message span').html(data.STD[0].fullname)
            $('.StdName').html(data.STD[0].fullname)
            $('.StdReg').html(data.STD[0].matric_no)
        }
        if(data.STDPay){
            let Tamt = 0
            let HistDis = document.querySelector('.payhist')
            for (let i = 0; i < data.STDPay.length; i++) {
                Tamt += data.STDPay[i].amount
                HistDis.innerHTML += `
                <tr class="gradeX">
                    <td>${i+1}</td>
                    <td><div align="center">${data.STDPay[i].feeID}</div></td>
                    <td><div align="center">NGN ${data.STDPay[i].amount.toLocaleString()}</div></td>
                    <td class="center"><div align="center">${data.STDPay[i].datepaid}</div></td>
                </tr>
                `

            }
            const OutstandingFee = data.FEE[0].amount-Tamt
            $('.fee span').html(data.FEE[0].amount.toLocaleString()) //Fees
            $('.amtpaid span').html(Tamt.toLocaleString()) //Total Paid
            $('.pendfee span').html(OutstandingFee.toLocaleString()) //Outstanding Payment
            //Payment Form Side
            $('.main_fee').html(`NGN ${data.FEE[0].amount.toLocaleString()}`) //Fees
            $('.tol_paid').html(`NGN ${Tamt.toLocaleString()}`) //Total Paid
            $('.outst_fee').html(`NGN ${OutstandingFee.toLocaleString()}`) //Outstanding Payment

            //FOR SHOWING CLEARANCE STATUS
            const clear = '<td><div align="center" ><span  class="label label-primary">Cleared</span></div></td>'
            const pending = '<td><div align="center"><span class="label label-warning">Pending</div></td>'
            const actions = [data.STD[0].is_hostel_approved,data.STD[0].is_sport_approved,data.STD[0].is_stud_affairs_approved]
            const show = document.querySelector('.cleardis')
            if(OutstandingFee == 0){
                $('.clearfee').html('<div align="center" ><span  class="label label-primary">Cleared</span></div>')
            }else{
                $('.clearfee').html('<div align="center"><span class="label label-warning">Pending</div>')
            }
            let AllApproved = 0
            for (let i = 0; i < actions.length; i++) {
                if(actions[i] == 1){
                    show.innerHTML += clear
                }else{
                    show.innerHTML += pending
                }
                
                //FOR DOWNLOAD THE CLEARANCE LATTER AND STATUS UPDATE
                if(actions[i] == 1){AllApproved++}
                if(OutstandingFee == 0 && AllApproved == 3){
                    $('.clearstatus').html('<div align="center"><i class="fa fa-check-circle" style="font-size:28px;color:green"></i> Cleared</div>')
                    $('.getCletter').html('<small><a href="/Print-Clearance-Form" target="_blank">Print Clearance Letter</a></small>')
                }else{
                    $('.clearstatus').html('<div align="center"><i class="fa fa-times-circle" style="font-size:28px;color:orange"></i> Pending</div>')
                    $('.getCletter').html('')
                }
            }
            
        }
    }
})

$('.FeeForm').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        data: {
            PayAmount: $('.payamt').val(),
        },
        success: (data) => {
            if(data.Pay){
                window.location.href = data.Pay
            }
            $('.FeeNotify').html(data.Notify)
            setTimeout(() => {
                $('.FeeNotify').html('')
            }, 3000)
        },
        error: (err) => {
            console.log(err)
        }
    })
})

$('.ChngPwdForm').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: "POST",
        data: {
            OldPwd: $('.old_pwd').val(),
            NewPwd: $('.new_pwd').val(),
            CNewPwd: $('.cnew_pwd').val(),
        },
        success: (data) => {
            if(data.Success){
                window.location.href = data.Success
            }
            $('.ChngPwdNotify').html(data.PNoify)
            setTimeout(() => {
                $('.ChngPwdNotify').html('')
            }, 3000)
        },
        error: (err) => {
            console.log(err)
        }
    })
})