document.getElementById('whatsapp').addEventListener('click', function () {

    var message = ''
    var phone_number = "55" + "62996973771";

    var url = "https://api.whatsapp.com/send?phone=" + phone_number + "&text=" + encodeURIComponent(message);
    window.open(url);

});