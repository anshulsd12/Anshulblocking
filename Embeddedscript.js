(function() {
    // Function to check and handle consent
    function checkConsentAndLoad() {
        let consentGiven = localStorage.getItem("cookieConsent") === "true";

        const youtubeIframe = document.querySelector(".youtube-vid iframe");

        if (!youtubeIframe) {
            console.warn("YouTube iframe not found.");
            return;
        }

        if (!consentGiven) {
            // Store the original src in data-src and remove the src to prevent loading
            youtubeIframe.setAttribute("data-src", youtubeIframe.src);
            youtubeIframe.src = "";
            createConsentPopup();
        } else {
            // If consent is already given, load the video
            loadYouTubeVideo();
        }
    }

    // Function to load YouTube video
    function loadYouTubeVideo() {
        const youtubeIframe = document.querySelector(".youtube-vid iframe");
        if (youtubeIframe && youtubeIframe.dataset.src) {
            youtubeIframe.src = youtubeIframe.dataset.src;
        }
    }

    // Function to create and show the consent popup
    function createConsentPopup() {
        const popup = document.createElement("div");
        popup.id = "cookie-consent-popup";
        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        popup.style.color = "white";
        popup.style.display = "flex";
        popup.style.alignItems = "center";
        popup.style.justifyContent = "center";
        popup.style.zIndex = "9999";
        popup.style.fontFamily = "Arial, sans-serif";
        popup.style.textAlign = "center";
        popup.style.padding = "20px";

        popup.innerHTML = `
            <div style="max-width: 400px; padding: 20px; background: #333; border-radius: 10px;">
                <h2>Cookie Consent</h2>
                <p>Do you allow YouTube to load and store cookies?</p>
                <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
                    <button id="accept-cookie" style="padding: 10px 20px; background: #FFA500; color: white; border: none; border-radius: 5px; cursor: pointer;">Accept</button>
                    <button id="decline-cookie" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById("accept-cookie").addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "true");
            popup.remove();
            loadYouTubeVideo(); // Load YouTube video
        });

        document.getElementById("decline-cookie").addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "false");
            popup.remove();
        });
    }

    // Run the function on page load
    document.addEventListener("DOMContentLoaded", checkConsentAndLoad);
})();
