function logar(){
    const senha = document.getElementById('senha').value;
    const token = "um_token";
    const hash = 'e8d95a51f3af4a3b134bf6bb680a213a';
    
    if(hex_md5(senha) === hash){
        alert('Sucesso');
        sessionStorage.setItem('token', token)
        location.href = "jogadores.html";
    }
    else{
        alert('Senha incorreta!')
    }
}

function apagatoken (){
    sessionStorage.removeItem('token')
}