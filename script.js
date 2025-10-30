// Espera a que toda la página se cargue
document.addEventListener('DOMContentLoaded', () => {

    // --- CAMBIA ESTA CONTRASEÑA ---
    // He puesto "251218" (25 de Diciembre 2018) como ejemplo.
    // ¡Pon la tuya! Puede ser números o texto.
    const LA_CONTRASEÑA = "2419";

    // --- IDs DE ELEMENTOS ---
    // Pantalla 0: Contraseña
    const passwordContainer = document.getElementById('password-container');
    const passwordButton = document.getElementById('passwordButton');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    // Pantalla 1: Inicio
    const startContainer = document.getElementById('start-container');
    const startButton = document.getElementById('startButton');

    // Pantalla 2: Historia
    const storyContainer = document.getElementById('story-container');
    const nextButton = document.getElementById('nextButton');
    const slides = document.querySelectorAll('.slide');
    
    // Pantalla 3: Propuesta
    const proposalContainer = document.getElementById('proposal-container');
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    
    // Pantalla 4: Final
    const mensajeFinal = document.getElementById('mensajeFinal');
    
    // Audio
    const cancion = document.getElementById('cancionMorat');

    // Variable de diapositiva
    let currentSlideIndex = 0; 

    // --- LÓGICA DE CONTRASEÑA (PANTALLA 0) ---
    passwordButton.addEventListener('click', () => {
        if (passwordInput.value === LA_CONTRASEÑA) {
            // ¡Correcto! Oculta la contraseña y muestra el inicio
            passwordContainer.classList.add('hidden');
            startContainer.classList.remove('hidden');
        } else {
            // ¡Incorrecto! Muestra el error
            passwordError.classList.remove('hidden');
            passwordInput.value = ""; // Limpia el campo
        }
    });

    // Permite presionar "Enter" en el campo de contraseña
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            passwordButton.click(); // Simula un clic en el botón
        }
    });

    // --- LÓGICA DE INICIO (PANTALLA 1) ---
    startButton.addEventListener('click', () => {
        startContainer.classList.add('hidden'); 
        storyContainer.classList.remove('hidden'); 
    });

    // --- LÓGICA DE LA HISTORIA (PANTALLA 2) ---
    nextButton.addEventListener('click', () => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex++;

        if (currentSlideIndex < slides.length) {
            slides[currentSlideIndex].classList.add('active');
            if (currentSlideIndex === slides.length - 1) {
                nextButton.textContent = 'Y ahora... ❤️';
            }
        } else {
            storyContainer.classList.add('hidden'); 
            proposalContainer.classList.remove('hidden'); 
        }
    });

    // --- LÓGICA DE LA PROPUESTA (PANTALLA 3) ---
    function moveNoButton() {
        const maxX = window.innerWidth - noButton.clientWidth;
        const maxY = window.innerHeight - noButton.clientHeight;

        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);

        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';

        const currentScale = parseFloat(yesButton.style.transform.replace('scale(', '')) || 1;
        yesButton.style.transform = `scale(${currentScale + 0.1})`;
        yesButton.style.fontSize = `${(currentScale + 0.1)}em`;
    }

    noButton.addEventListener('mouseover', moveNoButton);

    // --- LÓGICA DEL SÍ (PANTALLA 4) ---
    yesButton.addEventListener('click', () => {
        proposalContainer.classList.add('hidden');
        mensajeFinal.classList.remove('hidden');
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
        cancion.play();
    });
});