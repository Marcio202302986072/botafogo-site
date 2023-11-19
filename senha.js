function calcularMd5(string) {
    return CryptoJS.MD5(string).toString();
}

function verificarSenha() {
    var senhaDigitada = document.getElementById("senha").value;

    // Convertendo a senha para maiúsculas antes de criptografar
    var senhaCriptografada = calcularMd5(senhaDigitada).toUpperCase();

    // Logs para depuração
    console.log("Senha Digitada:", senhaDigitada);
    console.log("Senha Criptografada:", senhaCriptografada);

    // Verifica se a senha criptografada está correta
    if (senhaCriptografada === calcularMd5("SENHA").toUpperCase()) {
        window.location.href = 'detalhes.html';
    } else {
        alert("Senha incorreta. Tente novamente.");
    }
}
