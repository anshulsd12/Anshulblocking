(function () {
  // Function to create and display the Cookie Manager popup
  function createPopup() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "popup-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = 1000;
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "#fff";
    overlay.style.fontFamily = "Arial, sans-serif";

    // Create popup box
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.backgroundColor = "#333";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    popup.innerHTML = `
      <h2 style="margin-bottom: 10px;">Cookie Manager</h2>
      <p>Manage your consent for the following content:</p>
      <div style="margin-top: 20px; text-align: left;">
        <!-- Consent for YouTube video -->
        <div style="margin-bottom: 15px;">
          <p>YouTube:</p>
          <label>
            <input type="radio" name="youtube-consent" value="yes"> Yes
          </label>
          <label>
            <input type="radio" name="youtube-consent" value="no" checked> No
          </label>
        </div>
      
        <!-- Consent for Clarity Script -->
        <div style="margin-bottom: 15px;">
          <p>Clarity Script:</p>
          <label>
            <input type="radio" name="clarity-consent" value="yes"> Yes
          </label>
          <label>
            <input type="radio" name="clarity-consent" value="no" checked> No
          </label>
        </div>
      </div>
      <button id="save-consent" style="padding: 10px 20px; margin-top: 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Save Consent</button>
    `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listener for the Save Consent button
    document.getElementById("save-consent").addEventListener("click", saveConsent);
  }

  // Function to save consent and apply it to the content
  function saveConsent() {
    // Get consent values
    const youtubeConsent = document.querySelector('input[name="youtube-consent"]:checked').value;
    const clarityConsent = document.querySelector('input[name="clarity-consent"]:checked').value;

    // Show or hide the YouTube video based on consent
    const youtubeVideoPlaceholder = document.getElementById("youtube-video-placeholder");
    if (youtubeVideoPlaceholder && youtubeConsent === "yes") {
      const youtubeVideo = document.createElement("iframe");
      youtubeVideo.id = "youtube-video";
      youtubeVideo.width = "560";
      youtubeVideo.height = "315";
      youtubeVideo.src = "https://www.youtube.com/embed/oDNAsOnfZ-Q";
      youtubeVideo.title = "YouTube video";
      youtubeVideo.frameborder = "0";
      youtubeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      youtubeVideo.allowfullscreen = true;
      youtubeVideoPlaceholder.replaceWith(youtubeVideo);
    } else if (youtubeVideoPlaceholder) {
      youtubeVideoPlaceholder.remove();
    }
    // Show or hide the Clarity script based on consent
    const clarityScriptPlaceholder = document.getElementById("clarity-script-placeholder");
    if (clarityScriptPlaceholder && clarityConsent === "yes") {
      const clarityScript = document.createElement("script");
      clarityScript.src = "https://www.clarity.ms/tag/f4v1091lex";
      clarityScript.async = true;
      clarityScriptPlaceholder.replaceWith(clarityScript);
    } else if (clarityScriptPlaceholder) {
      clarityScriptPlaceholder.remove();
    }

    // Remove the popup
    const overlay = document.getElementById("popup-overlay");
    if (overlay) overlay.remove();
  }

  // Initialize the popup on page load
  document.addEventListener("DOMContentLoaded", () => {
    // Initially hide the content by using placeholders
    const contentDiv = document.getElementById("content");

    contentDiv.innerHTML = `
      <!-- YouTube Video Placeholder -->
      <div id="youtube-video-placeholder" style="width: 560px; height: 315px; background: #f0f0f0; text-align: center; line-height: 315px; color: #ccc;">
        YouTube Video Placeholder (Consent Required)
      </div>


      <!-- Clarity Script Placeholder -->
      <div id="clarity-script-placeholder" style="width: 150px; height: 40px; background: #f0f0f0; text-align: center; line-height: 40px; color: #ccc;">
        Clarity Script Placeholder (Consent Required)
      </div>
    `;

    // Create and show the popup
    createPopup();
  });
})();
