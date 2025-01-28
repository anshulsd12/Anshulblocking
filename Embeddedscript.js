(function () {
  // Function to unblock and execute the Clarity script
  function unblockClarityScript() {
    const clarityScript = document.querySelector('script[src="https://www.clarity.ms/tag/f4v1091lex"]');
    if (clarityScript) {
      // Create a new script element to execute the blocked script
      const newScript = document.createElement("script");
      newScript.src = clarityScript.src;
      newScript.async = true;
      document.head.appendChild(newScript); // Inject the script after consent
    }
  }

  // Function to dynamically load the YouTube iframe
  function loadYouTubeVideo() {
    const youtubePlaceholder = document.getElementById("youtube-video-placeholder");
    if (youtubePlaceholder) {
      const youtubeIframe = document.createElement("iframe");
      youtubeIframe.src = "https://www.youtube.com/embed/oDNAsOnfZ-Q";
      youtubeIframe.width = "560";
      youtubeIframe.height = "315";
      youtubeIframe.frameBorder = "0";
      youtubeIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      youtubeIframe.allowFullscreen = true;
      youtubePlaceholder.replaceWith(youtubeIframe);
    }
  }

  // Function to block the Clarity script initially
  function blockClarityScript() {
    const clarityScript = document.querySelector('script[src="https://www.clarity.ms/tag/f4v1091lex"]');
    if (clarityScript) {
      // Replace the script's src with a dummy value to prevent it from loading
      clarityScript.dataset.originalSrc = clarityScript.src; // Store the original src
      clarityScript.src = ""; // Set src to empty to block loading
    }
  }

  // Function to create the consent popup
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
      <p>Do you consent to load the following content?</p>
      <ul style="text-align: left; margin: 15px 0;">
        <li>YouTube Video</li>
        <li>Clarity Analytics Script</li>
      </ul>
      <button id="accept-consent" style="
        padding: 10px 20px; margin-top: 20px;
        background-color: #4CAF50; color: white; border: none;
        border-radius: 5px; cursor: pointer;
      ">Yes, I Consent</button>
      <button id="deny-consent" style="
        padding: 10px 20px; margin-top: 20px; margin-left: 10px;
        background-color: #F44336; color: white; border: none;
        border-radius: 5px; cursor: pointer;
      ">No, I Deny</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add event listeners for consent buttons
    document.getElementById("accept-consent").addEventListener("click", () => {
      unblockClarityScript(); // Unblock and load the Clarity script
      loadYouTubeVideo(); // Load YouTube iframe after consent
      document.getElementById("popup-overlay").remove(); // Remove popup
    });

    document.getElementById("deny-consent").addEventListener("click", () => {
      document.getElementById("popup-overlay").remove(); // Remove popup
    });
  }

  // On page load
  document.addEventListener("DOMContentLoaded", () => {
    blockClarityScript(); // Block the Clarity script initially
    createPopup(); // Show consent popup
  });
})();
