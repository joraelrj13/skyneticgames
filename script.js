// 1. SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Unobserve to only animate once per page load
            // scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(element => {
    scrollObserver.observe(element);
});

// Trigger initial load animations for hero
window.onload = () => {
    const heroContent = document.querySelector('.hero-content.reveal');
    if (heroContent) {
        setTimeout(() => heroContent.classList.add('active'), 200);
    }
};

// 2. IMAGE SLIDER LOGIC
// Add your specific image file names to this array
const images = [
    'assets/aquarium1.jpg',
    'assets/aquarium2.jpg',
   
];
let currentIndex = 0;

const sliderImg = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('sliderProgress');

function updateSlider() {
    // Fade out slightly
    sliderImg.style.opacity = '0.5';
    
    setTimeout(() => {
        // Change image source (Handling errors gracefully if image doesn't exist yet)
        sliderImg.src = images[currentIndex];
        
        // Update Progress Bar length
        const progressPercentage = ((currentIndex + 1) / images.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Fade back in
        sliderImg.style.opacity = '1';
    }, 200); // 200ms matches the CSS transition time
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length; // Loops back to 0 at the end
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Loops backwards
        updateSlider();
    });
    
    // Set initial progress bar width
    updateSlider();
}

// 3. VIDEO MODAL LOGIC
const playBtn = document.getElementById('playBtn');
const modal = document.getElementById('videoModal');
const closeBtn = document.querySelector('.close-btn');
const iframe = document.getElementById('videoIframe');

// Replace this URL with your actual YouTube Trailer Embed link or local mp4 path
const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; 

if (playBtn) {
    playBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        iframe.src = videoUrl; // Sets the source, forcing it to load/play
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = ""; // Clears the source to stop the video/audio from playing in background
    });
}

// Close modal if user clicks outside the video box
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        iframe.src = "";
    }
});

// 4. SMOOTH SCROLLING NAV FIX
// Ensures that clicking the nav buttons smoothly scrolls instead of jumping
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if(targetId === "#") return; // Ignore empty links

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
