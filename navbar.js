function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('mainContent')?.classList.add('blur');
    showLogin();
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('mainContent')?.classList.remove('blur');
    document.querySelectorAll('#loginModal input').forEach(input => input.value = "");
}

function openJoinUs() {
    window.location.href = "JoinUs.html";
}

function showLogin() {
    document.getElementById('loginBox').style.display = 'block';
    document.getElementById('registerBox').style.display = 'none';
    document.getElementById('forgotBox').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('registerBox').style.display = 'block';
    document.getElementById('forgotBox').style.display = 'none';
}

function showForgot() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('registerBox').style.display = 'none';
    document.getElementById('forgotBox').style.display = 'block';
}
