
// PAGE NAVIGATION

function goTo(number) {

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById('page' + number)
        .classList.add('active');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    if(number === 7) {
        celebrate();
    }

}


// FLOATING HEART ANIMATION

function createHeart() {

    const heart = document.createElement('div');

    heart.className = 'floating-heart';

    heart.innerHTML = ['♥','♡','💗','💕','❤️'][
        Math.floor(Math.random() * 5)
    ];

    heart.style.left = Math.random() * 100 + 'vw';

    heart.style.fontSize =
        (15 + Math.random() * 25) + 'px';

    heart.style.animationDuration =
        (5 + Math.random() * 5) + 's';

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);

}

setInterval(createHeart, 600);


// BLOW CANDLE

function blowCandle() {

    const flame = document.getElementById('flame');

    flame.style.display = 'none';

    document.getElementById('wishText').innerHTML =
        'May all your beautiful dreams come true! ❤️';

    burstHearts();

}


// HEART BURST

function burstHearts() {

    for(let i = 0; i < 25; i++) {

        setTimeout(() => {

            const heart = document.createElement('div');

            heart.innerHTML = '❤️';

            heart.style.position = 'fixed';

            heart.style.left = Math.random() * 100 + 'vw';

            heart.style.top = '50vh';

            heart.style.fontSize = '30px';

            heart.style.zIndex = '100';

            document.body.appendChild(heart);

            heart.animate([
                {
                    transform: 'translateY(0) scale(0)',
                    opacity: 1
                },
                {
                    transform:
                    `translateY(-${100 + Math.random()*300}px) scale(1.5)`,
                    opacity: 0
                }
            ], {
                duration: 1800
            });

            setTimeout(() => heart.remove(), 1800);

        }, i * 50);

    }

}


// SECRET GIFT

function openGift() {

    const gift = document.querySelector('.gift-box');

    gift.style.transform = 'scale(1.5) rotate(20deg)';

    setTimeout(() => {

        gift.innerHTML = '💖';

        document.getElementById('giftMessage').innerHTML =
            'SURPRISE! ❤️<br><br>' +
            'You are my most precious gift.<br>' +
            'I do not need anything else in this world,<br>' +
            'as long as I have your love.';

        document.getElementById('finalBtn')
            .classList.remove('hidden');

        burstHearts();

    }, 600);

}


// GRAND CELEBRATION

function celebrate() {

    const message = document.getElementById(
        'celebrationMessage'
    );

    if(message.innerHTML !== '') return;

    message.innerHTML =
        'You deserve a lifetime of happiness! ❤️';

    const symbols = ['🎆','✨','💖','🎉','🌹','❤️'];

    for(let i = 0; i < 100; i++) {

        setTimeout(() => {

            const item = document.createElement('div');

            item.innerHTML =
                symbols[Math.floor(Math.random()*symbols.length)];

            item.style.position = 'fixed';

            item.style.left = Math.random()*100 + 'vw';

            item.style.top = Math.random()*100 + 'vh';

            item.style.fontSize =
                (20 + Math.random()*25) + 'px';

            item.style.zIndex = '100';

            item.style.pointerEvents = 'none';

            document.body.appendChild(item);

            item.animate([
                {
                    transform: 'scale(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: 'scale(1.5) rotate(360deg)',
                    opacity: 0
                }
            ], {
                duration: 2500
            });

            setTimeout(() => item.remove(), 2500);

        }, i * 35);

    }

}


// BACKGROUND MUSIC

let audioContext;
let musicInterval;
let musicPlaying = false;

function toggleMusic() {

    const button = document.getElementById('musicBtn');

    if(!audioContext) {

        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    }

    if(audioContext.state === 'suspended') {
        audioContext.resume();
    }

    if(musicPlaying) {

        clearInterval(musicInterval);

        musicPlaying = false;

        button.innerHTML = '♫ Music';

        return;

    }

    musicPlaying = true;

    button.innerHTML = '♫ Playing';

    // A soft synthesized romantic melody

    const notes = [
        261.63, 329.63, 392.00,
        329.63, 293.66, 349.23,
        392.00, 329.63
    ];

    let index = 0;

    function playNote() {

        if(!musicPlaying) return;

        const oscillator = audioContext.createOscillator();

        const gain = audioContext.createGain();

        oscillator.type = 'sine';

        oscillator.frequency.value = notes[index];

        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.035,
            audioContext.currentTime + 0.1
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.8
        );

        oscillator.connect(gain);

        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(audioContext.currentTime + 0.9);

        index = (index + 1) % notes.length;

    }

    playNote();

    musicInterval = setInterval(playNote, 850);

}
