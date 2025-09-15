import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import hauntaudio from '../assets/audio/haunt.mp3';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
 useEffect(() => {
    // ============ AUDIO ============
    const hauntAudio = new Audio(hauntaudio);
    hauntAudio.loop = true;
    hauntAudio.volume = 0.3;
    hauntAudio.play().catch(e => console.warn("Audio autoplay blocked:", e));

    // ============ STYLES ============
    const style = document.createElement('style');
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: radial-gradient(circle, #000, #111);
        color: white;
        font-family: 'Creepster', cursive;
        height: 100vh;
        overflow: hidden;
        cursor: none;
        position: relative;
      }
      .glitch-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15rem;
        color: #ff003c;
        text-shadow: 2px 0 #00fffc, -2px 0 #ff00ff, 0 2px #ffff00, 0 -2px #00ffff;
        letter-spacing: -5px;
        z-index: 10;
        animation: glitch 2s infinite alternate-reverse;
      }
      @keyframes glitch {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        25% { transform: translate(-52%, -52%) rotate(2deg); }
        50% { transform: translate(-48%, -48%) rotate(-2deg); }
        75% { transform: translate(-51%, -51%) rotate(1deg); }
        100% { transform: translate(-49%, -49%) rotate(-1deg); }
      }
      .blood-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .blood-drop {
        position: absolute;
        width: 8px;
        height: 30px;
        background: #8b0000;
        border-radius: 50% 50% 20% 20%;
        opacity: 0.8;
        filter: drop-shadow(0 0 5px #ff0000);
        animation: fall linear infinite;
      }
      @keyframes fall {
        0% { transform: translateY(-100px); }
        100% { transform: translateY(calc(100vh + 100px)); }
      }
      .ghost-follower {
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        mix-blend-mode: screen;
        text-shadow: 0 0 10px rgba(255,255,255,0.8);
        animation: haunt 2s ease-in-out infinite alternate;
      }
      @keyframes haunt {
        0% { transform: scale(1) rotate(0deg); }
        100% { transform: scale(1.1) rotate(5deg); }
      }
      .jump-scare {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .jump-scare.active {
        opacity: 1;
        pointer-events: all;
      }
      .jump-scare-content {
        text-align: center;
        background: #000;
        padding: 2rem;
        border: 3px solid #ff003c;
        box-shadow: 0 0 30px #ff003c;
        animation: shake 0.3s ease-in-out 0s 3;
      }
      @keyframes shake {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-3deg); }
        50% { transform: scale(1) rotate(3deg); }
        75% { transform: scale(1.05) rotate(-1deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      .jump-scare h2 {
        font-size: 3rem;
        color: #ff003c;
        margin: 0 0 1rem;
        text-shadow: 0 0 10px #ff003c;
      }
      .jump-scare p {
        font-size: 1.2rem;
        color: #fff;
      }
      .escape-link {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        background: #ff003c;
        color: white;
        padding: 0.8rem 2rem;
        text-decoration: none;
        border-radius: 50px;
        font-family: 'Creepster', cursive;
        font-size: 1.5rem;
        border: 2px solid #fff;
        box-shadow: 0 0 15px rgba(255,0,60,0.7);
        transition: all 0.2s ease;
      }
      .escape-link:hover {
        background: #fff;
        color: #ff003c;
        transform: translateX(-50%) scale(1.1) rotate(5deg);
      }
      .escape-link:active {
        transform: translateX(-50%) scale(0.95);
      }
    `;
    document.head.appendChild(style);

    // ============ DOM ELEMENTS ============
    const glitchTitle = document.createElement('h1');
    glitchTitle.className = 'glitch-title';
    glitchTitle.textContent = '404';
    document.body.appendChild(glitchTitle);

    const bloodContainer = document.createElement('div');
    bloodContainer.className = 'blood-container';
    document.body.appendChild(bloodContainer);

    for (let i = 0; i < 5; i++) {
      const drop = document.createElement('div');
      drop.className = 'blood-drop';
      drop.style.left = `${10 + i * 15}%`;
      drop.style.animationDuration = `${3 + i}s`;
      drop.style.animationDelay = `${i * 0.5}s`;
      bloodContainer.appendChild(drop);
    }

    const ghostFollower = document.createElement('div');
    ghostFollower.className = 'ghost-follower';
    ghostFollower.textContent = '👻';
    document.body.appendChild(ghostFollower);

    const jumpScare = document.createElement('div');
    jumpScare.className = 'jump-scare';
    jumpScare.innerHTML = `
      <div class="jump-scare-content">
        <h2>YOU SHOULDN’T BE HERE.</h2>
        <p>Click to banish the curse... for now.</p>
      </div>
    `;
    document.body.appendChild(jumpScare);

    const escapeLink = document.createElement('a');
    escapeLink.href = '/';
    escapeLink.className = 'escape-link';
    escapeLink.textContent = '← Escape to Safety';
    document.body.appendChild(escapeLink);

    // ============ EVENT LISTENERS ============
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - 20;
      const y = e.clientY - 20;
      ghostFollower.style.transform = `translate(${x}px, ${y}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const handleJumpScareClick = () => {
      jumpScare.classList.remove('active');
      document.body.style.cursor = 'none';
    };

    jumpScare.addEventListener('click', handleJumpScareClick);

    // Trigger jump scare after 5s
    const jumpTimer = setTimeout(() => {
      jumpScare.classList.add('active');
      document.body.style.cursor = 'pointer';
    }, 5000);

    // ============ CLEANUP ============
    return () => {
      // Stop audio
      hauntAudio.pause();
      hauntAudio.currentTime = 0;

      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      jumpScare.removeEventListener('click', handleJumpScareClick);

      // Clear timeout
      clearTimeout(jumpTimer);

      // Remove elements
      document.body.removeChild(glitchTitle);
      document.body.removeChild(bloodContainer);
      document.body.removeChild(ghostFollower);
      document.body.removeChild(jumpScare);
      document.body.removeChild(escapeLink);

      // Remove style
      document.head.removeChild(style);

      // Restore cursor
      document.body.style.cursor = '';
    };
  }, []);

 // Return null — we’re manipulating DOM directly
  return null;
};


export default NotFound;
