let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;
let quizQuestions = [
    {
        question: "Apa ibukota Indonesia?",
        options: ["Jakarta", "Bandung", "Surabaya", "Malang"],
        answer: 0
    },
    {
        question: "Apa bahasa pemrograman ini?",
        options: ["Python", "JavaScript", "Java", "C++"],
        answer: 1
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        options: ["Soekarno", "Soeharto", "Habibie", "Jokowi"],
        answer: 0
    },
    {
        question: "Berapa hasil dari 2 + 2 × 2?",
        options: ["6", "8", "4", "10"],
        answer: 0
    },
    {
        question: "Apa nama pulau terbesar di Indonesia?",
        options: ["Jawa", "Sumatra", "Kalimantan", "Sulawesi"],
        answer: 2
    }
];
let currentQuestion = 0;
let score = 0;

// Autentikasi
document.getElementById('login-btn').addEventListener('click', () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        showQuizSection();
    } else {
        alert('Username atau password salah!');
    }
});

document.getElementById('register-btn').addEventListener('click', () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username && password) {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registrasi berhasil!');
    } else {
        alert('Isi username dan password!');
    }
});

// Quiz
function showQuizSection() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    let question = quizQuestions[currentQuestion];
    document.getElementById('question').innerText = question.question;
    let options = document.getElementById('options');
    options.innerHTML = '';
    // Acak urutan soal jika baru mulai quiz
    if (currentQuestion === 0) {
        quizQuestions = quizQuestions
            .map(q => ({ q, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ q }) => q);
    }

    question.options.forEach((option, index) => {
        let li = document.createElement('li');
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = index;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(option));
        options.appendChild(li);
    });
}

document.getElementById('submit-btn').addEventListener('click', () => {
    let selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert('Pilih salah satu jawaban dulu!');
        return;
    }

    let selectedOption = selected.value;
    let question = quizQuestions[currentQuestion];
    if (parseInt(selectedOption) === question.answer) {
        score++;
        document.getElementById('result').innerText = 'Benar!';
    } else {
        document.getElementById('result').innerText = `Salah! Jawaban yang benar adalah ${question.options[question.answer]}.`;
    }
    currentQuestion++;
    if (currentQuestion >= quizQuestions.length) {
        document.getElementById('question').innerText = `Quiz selesai! Skor Anda ${score}/${quizQuestions.length}.`;
        document.getElementById('options').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none';
    } else {
        showQuestion();
    }
});
