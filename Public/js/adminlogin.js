// ***************** ADMINISTRATOR LOGIN **********************//
$('form').on('submit', async (e) => {
    e.preventDefault()

    const Username = $('.username').val()
    const Pwd = $('.pwd').val()

    const response = await fetch('http://localhost:1000/Admin/Login', {
        method: 'POST',
        headers: {
        'Content-Type':'Application/json'
        },
        body: JSON.stringify({ Username, Pwd })
    }).then(res => res.json());

    if (response.Notify) {
        $('.Notify').html(response.Notify)
        setTimeout(() => {$('.Notify').html('')}, 3000)
    }else{
        window.location = response.success
    }
})