document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const guestNameInput = document.getElementById('guest-name');
    const errorMsg = document.getElementById('error-msg');
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');
    const displayName = document.getElementById('display-name');

    // Lógica para abrir el sobre
    const openEnvelope = () => {
        const name = guestNameInput.value.trim();
        
        if (name === '') {
            errorMsg.classList.remove('hidden');
            guestNameInput.style.borderBottomColor = '#ff9999';
            setTimeout(() => {
                guestNameInput.style.borderBottomColor = 'rgba(255,255,255,0.3)';
            }, 2000);
            return;
        }

        // Establecer el nombre en la invitación formal
        displayName.textContent = name;

        // Animar la apertura del sobre
        envelopeOverlay.classList.add('open');

        // Mostrar el contenido principal después del retraso de la animación
        mainContent.classList.remove('hidden');

        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.play().catch(e => console.log('Autoplay prevent or missing audio file:', e));
        }

        setTimeout(() => {
            // Retraso extra pequeño para activar la animación de opacidad si es necesario
            setTimeout(() => {
                mainContent.classList.add('visible');
                window.scrollTo(0, 0);
            }, 50);
        }, 1000); // 1 segundo coincide con el CSS transform
    };

    openBtn.addEventListener('click', openEnvelope);

    // Permitir presionar "Enter" para abrir
    guestNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            openEnvelope();
        }
    });

    // Ocultar mensaje de error cuando el usuario escribe
    guestNameInput.addEventListener('input', () => {
        errorMsg.classList.add('hidden');
        guestNameInput.style.borderBottomColor = 'rgba(255,255,255,0.3)';
    });

    // --- LÓGICA DEL CONTADOR REGRESIVO ---
    // Fecha del evento: 7 de Julio de 2026, 08:00 AM
    const targetDate = new Date('July 7, 2026 08:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            // El evento ya pasó
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Actualizar el HTML añadiendo un cero a la izquierda si es necesario
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    // Llamada inicial para evitar el parpadeo de "00"
    updateCountdown();

    // Lógica del botón de Mute
    const muteBtn = document.getElementById('mute-btn');
    const bgMusicElement = document.getElementById('bg-music');
    
    if (muteBtn && bgMusicElement) {
        muteBtn.addEventListener('click', () => {
            if (bgMusicElement.muted) {
                bgMusicElement.muted = false;
                muteBtn.textContent = '🔊';
            } else {
                bgMusicElement.muted = true;
                muteBtn.textContent = '🔇';
            }
        });
    }
});
