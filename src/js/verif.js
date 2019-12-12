function verifMail() {
    const email = $('#emailIns').val();
    
    if(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
        $('#emailIns').css('border', '2px solid green');
    }
    else {
        $('#emailIns').css('border', '2px solid red');
    }
}

function  confirmPassword() {
    const pswd1 = $('#passwordIns').val();
    const pswd2 = $('#passwordSecIns').val();

    if(pswd1 !== pswd2) {
        $('#passwordSecIns').css('border', '2px solid red');
    } 
    else {
        $('#passwordSecIns').css('border', '2px solid green');
    }
}