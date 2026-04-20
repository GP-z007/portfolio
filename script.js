document.addEventListener('DOMContentLoaded', () => {
    // PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    const counterEl = document.getElementById('preloader-counter');
    const textEl = document.getElementById('preloader-text');
    
    if (preloader) {
        let count = 0;
        const targetCount = 100;
        const duration = 1500; // 1.5 seconds loading
        const interval = duration / targetCount;
        
        const texts = ["INITIALIZING...", "TRAINING MODELS...", "OPTIMIZING STACK...", "READY."];
        let textIndex = 0;
        
        // Cycle texts
        const textInterval = setInterval(() => {
            textIndex++;
            if(textIndex < texts.length) {
                textEl.textContent = texts[textIndex];
            }
        }, duration / 4);

        // Count up
        const countInterval = setInterval(() => {
            count++;
            counterEl.textContent = count + "%";
            
            if (count >= targetCount) {
                clearInterval(countInterval);
                clearInterval(textInterval);
                textEl.textContent = "READY.";
                
                // Fade out
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    // Allow the body scroll again if we had hidden it
                }, 400);
            }
        }, interval);
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger the snappy CSS transition
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => observer.observe(el));
    
    // DARK ROOM INTERACTION (Arsenal Section)
    const arsenalSection = document.getElementById('arsenal');
    if (arsenalSection) {
        const arsenalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.classList.add('dark-room');
                } else {
                    document.body.classList.remove('dark-room');
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% visible
        
        arsenalObserver.observe(arsenalSection);
    }
    
    // Parallax effect on hero section (optional subtle touch)
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const scrollPercent = window.scrollY / window.innerHeight;
            heroContent.style.transform = `translateY(${scrollPercent * 100}px)`;
            heroContent.style.opacity = 1 - (scrollPercent * 1.5);
        }
    });

    // Typewriter effect logic
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = [
            "IMPACT", "PERFORMANCE", "SCALE", "SPEED", "EFFICIENCY", "ELEGANCE", "PRECISION", "POWER", "USERS", "GROWTH",
            "INNOVATION", "AESTHETICS", "QUALITY", "ROBUSTNESS", "EXCELLENCE", "RELIABILITY", "RESULTS", "SUCCESS", "THE FUTURE", "DISRUPTION",
            "SCALABILITY", "RESILIENCE", "ARCHITECTURE", "VELOCITY", "EXECUTION", "MASTERY", "DOMINANCE", "CREATIVITY", "VISION", "VALUE",
            "SECURITY", "USABILITY", "TRANSFORMATION", "EVOLUTION", "MOMENTUM", "LEADERSHIP", "CLARITY", "FOCUS", "LOGIC", "STRUCTURE",
            "SYNERGY", "AGILITY", "ADAPTABILITY", "AUTOMATION", "INTELLIGENCE", "OPTIMIZATION", "BRILLIANCE", "PERFECTION", "FLUIDITY", "DYNAMICS",
            "MOTION", "ENERGY", "INFLUENCE", "REACH", "DEPTH", "BREADTH", "SIMPLICITY", "COMPLEXITY", "HARMONY", "RHYTHM",
            "BALANCE", "PROGRESSION", "ACCELERATION", "ASCENSION", "ELEVATION", "BREAKTHROUGHS", "DISCOVERY", "POTENTIAL", "CAPABILITY", "CAPACITY",
            "STRENGTH", "ENDURANCE", "VITALITY", "TENACITY", "GRIT", "RESOLVE", "PURPOSE", "INTENT", "DRIVE", "AMBITION",
            "PASSION", "FIRE", "SPARK", "GENIUS", "INGENUITY", "CRAFT", "ARTISTRY", "EXPERTISE", "SKILL", "TALENT",
            "PROWESS", "FINESSE", "FLAIR", "BOLDNESS", "AUDACITY", "COURAGE", "CONFIDENCE", "ACTION", "VICTORY", "IMPACT"
        ];
        
        let wordIndex = 0;
        let charIndex = words[0].length; // Start with the first word fully displayed
        let isDeleting = true;
        let pauseTime = 2500; // Time to wait before deleting again

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            
            typewriterElement.textContent = currentWord.substring(0, charIndex);
            
            let typeSpeed = isDeleting ? 40 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                // Word is fully typed
                typeSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Word is fully deleted
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause briefly before typing next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the effect after initial pause
        setTimeout(type, pauseTime);
    }

    console.log("Engines ready. Portfolio active.");
});
