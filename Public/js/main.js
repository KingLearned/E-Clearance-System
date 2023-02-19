// ***************** STUDENT'S LOGIN **********************//
$('form').on('submit', (e) => {
    e.preventDefault()
        $.ajax({
            method: "POST",
            data: {
                MatricNo: $('.log_matric_no').val(),
                Pwd: $('.log_std').val()
            },
            success: (data) => {
                if(data.valid){
                    window.location.href = data.valid
                }
                $('.dis_log_err').html(data.Notify)
                setTimeout(() => {
                    $('.dis_log_err').html('')
                }, 3000)
            },
            error: (err) => {
                console.log(err)
            }
        })
})