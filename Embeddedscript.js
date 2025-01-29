(function () {
    // Function to block the YouTube iframe until consent is given
    function blockYouTubeVideo() {
        const youtubeIframe = document.querySelector("iframe");
        if (youtubeIframe) {
            youtubeIframe.setAttribute("data-src", youtubeIframe.src);
            youtubeIframe.src = "";  // Prevents video from loading
        }
    }

    // Function to enable the YouTube iframe dynamically
    function enableYouTubeVideo() {
        const youtubeIframe = document.querySelector("iframe");
        if (youtubeIframe && youtubeIframe.dataset.src) {
            youtubeIframe.src = youtubeIframe.dataset.src; // Restores original src
        }
    }

    // Function to block Clarity script loading
    function blockClarityScript() {
        const existingClarityScript = document.querySelector('script[src*="clarity.ms"]');
        if (existingClarityScript) {
            existingClarityScript.remove();
        }
    }

    // Function to insert Clarity script once consent is granted
    function enableClarityScript() {
        const clarityScript = document.createElement("script");
        clarityScript.src = "https://www.clarity.ms/tag/f4v1091lex";
        clarityScript.async = true;
        document.head.appendChild(clarityScript);
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
                        <input type="radio" name="youtube-consent" value="no" checked> No I don't Accept
                    </label>
                </div>
                <!-- Consent for Clarity -->
                <div style="margin-bottom: 15px;">
                    <p>Clarity Analytics:</p>
                    <label>
                        <input type="radio" name="clarity-consent" value="yes"> Yes
                    </label>
                    <label>
                        <input type="radio" name="clarity-consent" value="no" checked> No
                    </label>
                </div>
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
        const clarityConsent = document.querySelector('input[name="clarity-consent"]:checked').value;

        if (youtubeConsent === "yes") {
            enableYouTubeVideo();
        }
        if (clarityConsent === "yes") {
            enableClarityScript();
        }

        // Remove the popup after saving consent
        const overlay = document.getElementById("popup-overlay");
        if (overlay) overlay.remove();
    }

    // Function to observe DOM changes and apply YouTube blocking after React renders
    function observeYouTubeVideo() {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const youtubeIframe = document.querySelector("iframe");
                    if (youtubeIframe) {
                        blockYouTubeVideo();
                        observer.disconnect(); // Stop observing once the iframe is modified
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Initialize the popup, block content, and observe React-rendered elements
    document.addEventListener("DOMContentLoaded", () => {
        blockClarityScript();
        createPopup();
        observeYouTubeVideo(); // Ensure YouTube video gets blocked even if rendered after DOMContentLoaded
    });
})();
