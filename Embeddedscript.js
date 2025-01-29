(function() {
    // Check if consent is already granted
    let consentGranted = localStorage.getItem('cookieConsent') === 'true';

    // Function to create and show the consent popup
    function createConsentPopup() {
        // Create a popup div and its content
        const popup = document.createElement('div');
        popup.id = 'cookie-consent-popup';
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.right = '0';
        popup.style.bottom = '0';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        popup.style.color = 'white';
        popup.style.display = 'flex';
        popup.style.alignItems = 'center';
        popup.style.justifyContent = 'center';
        popup.style.zIndex = '9999';
        popup.style.fontFamily = 'Arial, sans-serif';
        popup.style.fontSize = '18px';
        popup.style.textAlign = 'center';
        popup.style.padding = '20px';
        popup.style.transition = 'opacity 0.3s ease';

        popup.innerHTML = `
            <div style="max-width: 400px; padding: 20px; background: #333; border-radius: 10px;">
                <h2 style="margin-bottom: 15px;">We use cookies to improve your experience.</h2>
                <p style="margin-bottom: 20px;">Do you consent to allow YouTube videos to load and collect data?</p>
                <div style="display: flex; justify-content: center; gap: 10px;">
                    <button id="accept-cookie" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Accept</button>
                    <button id="decline-cookie" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        // Add event listeners to buttons
        document.getElementById('accept-cookie').addEventListener('click', () => {
            consentGranted = true;
            localStorage.setItem('cookieConsent', 'true');
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
            loadYouTubeVideos(); // Load YouTube if consent is granted
        });

        document.getElementById('decline-cookie').addEventListener('click', () => {
            consentGranted = false;
            localStorage.setItem('cookieConsent', 'false');
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
        });
    }

    // Function to load YouTube videos if consent is granted
    function loadYouTubeVideos() {
        const youtubeFrames = document.querySelectorAll('.youtube-vid iframe');
        youtubeFrames.forEach(frame => {
            if (frame.dataset.src) {
                frame.src = frame.dataset.src; // Set iframe src from data-src attribute
            }
        });
    }

    // If consent is not already granted, show the popup
    if (!consentGranted) {
        createConsentPopup();
    } else {
        // If consent is already granted, load YouTube videos
        loadYouTubeVideos();
    }
})();
