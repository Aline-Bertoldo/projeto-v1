document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Por favor, preencha ambos os campos: nome de usuário e senha.");
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful!') {
            window.location.href = '/admin';  // Mudança para redirecionar para /admin ao invés de /dashboard
        } else if (data.error && data.error.includes("Please register")) {
            alert("Usuario nao encontrado. Please register first!");
			window.location.href = '/register.html';
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (!username || !password) {
        alert("Por favor, preencha ambos os campos: nome de usuário e senha.");
        return;
    }

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
