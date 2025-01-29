(function () {
    // Function to block the YouTube iframe until consent is given
    function blockYouTubeVideo() {
        const youtubeIframe = document.querySelector(".youtube-vid iframe");
        if (youtubeIframe) {
            youtubeIframe.setAttribute("data-src", youtubeIframe.src);
            youtubeIframe.src = "";
        }
    }

    // Function to enable the YouTube iframe dynamically
    function enableYouTubeVideo() {
        const youtubeIframe = document.querySelector(".youtube-vid iframe");
        if (youtubeIframe && youtubeIframe.dataset.src) {
            youtubeIframe.src = youtubeIframe.dataset.src;
        }
    }

    // Function to create the Cookie Manager popup
    function createPopup() {
        const overlay = document.createElement("div");
        overlay.id = "popup-overlay";
        overlay.style = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.7); z-index: 1000; display: flex;
            justify-content: center; align-items: center; color: #fff;
            font-family: Arial, sans-serif;
        `;

        const popup = document.createElement("div");
        popup.id = "popup";
        popup.style = `
            background-color: #333; padding: 20px; border-radius: 10px;
            text-align: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        popup.innerHTML = `
            <h2 style="margin-bottom: 10px;">Cookie Manager</h2>
            <p>Manage your consent for the following content:</p>
            <div style="margin-top: 20px; text-align: left;">
                <!-- Consent for YouTube -->
                <div style="margin-bottom: 15px;">
                    <p>YouTube Video:</p>
                    <label>
                        <input type="radio" name="youtube-consent" value="yes"> Yes I accept
                    </label>
                    <label>
                        <input type="radio" name="youtube-consent" value="no" checked> No
                    </label>
                </div>
            <button id="save-consent" style="
                padding: 10px 20px; margin-top: 20px;
                background-color: #4CAF50; color: white; border: none;
                border-radius: 5px; cursor: pointer;
            ">Save Consent</button>
        `;
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        document.getElementById("save-consent").addEventListener("click", saveConsent);
    }

    // Function to handle consent saving and applying
    function saveConsent() {
        const youtubeConsent = document.querySelector('input[name="youtube-consent"]:checked').value;
       
        if (youtubeConsent === "yes") {
            enableYouTubeVideo();
        }
       

        // Remove the popup after saving consent
        const overlay = document.getElementById("popup-overlay");
        if (overlay) overlay.remove();
    }

    // Initialize the popup and block content on page load
    document.addEventListener("DOMContentLoaded", () => {
        blockYouTubeVideo(); 
        
        createPopup(); 
    });
})();
