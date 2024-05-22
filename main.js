function startCountdown(duration) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        document.getElementById('minute-tens').textContent = parseInt(minutes / 10, 10);
        document.getElementById('minute-ones').textContent = parseInt(minutes % 10, 10);
        document.getElementById('second-tens').textContent = parseInt(seconds / 10, 10);
        document.getElementById('second-ones').textContent = parseInt(seconds % 10, 10);

        if (--timer < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    startCountdown(1199);
});



document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const image = document.getElementById('animatedImage');

    const adjustImagePosition = () => {
        const rect = button.getBoundingClientRect();
        let calculatedLeft = rect.right + window.scrollX - image.offsetWidth - -100;
        let calculatedTop = rect.top + window.scrollY + rect.height - 100;
        image.style.position = 'absolute';
        image.style.left = `${calculatedLeft}px`;
        image.style.top = `${calculatedTop}px`;
    };

    const animateImage = () => {
        image.style.display = 'block';
        let opacity = 0;
        let scale = 0.5;
        image.style.transform = `scale(${scale})`;
        const fadeIn = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.05;
                scale += 0.025;
                image.style.opacity = opacity;
                image.style.transform = `scale(${scale})`;
            } else {
                clearInterval(fadeIn);
                setTimeout(() => {
                    const fadeOut = setInterval(() => {
                        if (opacity > 0) {
                            opacity -= 0.05;
                            scale -= 0.025; 
                            image.style.opacity = opacity;
                            image.style.transform = `scale(${scale})`;
                        } else {
                            clearInterval(fadeOut);
                            image.style.display = 'none';
                        }
                    }, 50);
                }, 2000);
            }
        }, 50);
    };

    adjustImagePosition();
    setInterval(animateImage, 5000);

    window.addEventListener('resize', adjustImagePosition);
    window.addEventListener('scroll', adjustImagePosition);
});

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        var content = this.querySelector('.faq-content');
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
        const gif = document.getElementById('gif');
        let gifVisible = false;
    
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
    
        function handleGifVisibility(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !gifVisible) {
                    gifVisible = true;
                    gif.style.display = 'block';
    
                    setTimeout(() => {
                        gif.style.display = 'none';
                        observer.unobserve(gif);
                    }, 1000);
                }
            });
        }
    
        const observer = new IntersectionObserver(handleGifVisibility, observerOptions);
    
        observer.observe(gif);
    });

    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.numbers span');
    
        const runCounter = (element) => {
            const target = +element.getAttribute('data-target');
            const step = target / 200; // Ajuste o divisor para controlar a velocidade da animação
            
            let count = 0;
            const counter = setInterval(() => {
                count += step;
                if (count > target) {
                    count = target;
                    clearInterval(counter);
                }
                element.textContent = formatNumber(count, element.textContent);
            }, 10);
        };
    
        const formatNumber = (number, originalText) => {
            // Extrai o sufixo original e o texto subsequente
            const match = originalText.match(/(\d+)([a-zA-Z%]+)/);
            const suffix = match ? match[2] : '';
            const text = originalText.replace(/[\d+.,K%]+/, '');
    
            if (suffix.includes('K')) {
                return `+${(number / 1000).toFixed(1)}K ${text}`;
            } else if (suffix.includes('%')) {
                return `${Math.floor(number)}% ${text}`;
            } else {
                return `+${Math.floor(number)} ${text}`;
            }
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    observer.unobserve(entry.target); // Parar de observar após a animação iniciar
                }
            });
        }, { threshold: 0.5 }); // Ajuste conforme necessário para quando o elemento deve começar a animar
    
        counters.forEach(counter => {
            observer.observe(counter);
        });
    });
    