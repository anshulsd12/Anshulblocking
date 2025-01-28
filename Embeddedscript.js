(function () {
  // List of cookies related to Clarity
  const clarityCookies = ["_clck", "_clsk", "_cltk", "MUID", "CLID"];

  // Function to block Clarity script loading until consent is granted
  function blockClarityScript() {
    // Check if the Clarity script is already in the DOM, and remove it if it is
    const existingClarityScript = document.querySelector('script[src*="clarity.ms"]');
    if (existingClarityScript) {
      existingClarityScript.remove();
    }
    // Do not load the Clarity script yet
  }

  // Function to insert Clarity script once consent is granted
  function enableClarityScript() {
    const clarityScript = document.createElement("script");
    clarityScript.src = "https://www.clarity.ms/tag/f4v1091lex";
    clarityScript.async = true;
    document.head.appendChild(clarityScript); // Append the script only after consent
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
            <input type="radio" name="youtube-consent" value="yes"> Yes
          </label>
          <label>
            <input type="radio" name="youtube-consent" value="no" checked> No
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

    document
      .getElementById("save-consent")
      .addEventListener("click", saveConsent);
  }

  // Function to handle consent saving and applying
  function saveConsent() {
    const youtubeConsent = document.querySelector(
      'input[name="youtube-consent"]:checked'
    ).value;
    const clarityConsent = document.querySelector(
      'input[name="clarity-consent"]:checked'
    ).value;

    if (youtubeConsent === "yes") {
      enableYouTubeIframe();
    }
    if (clarityConsent === "yes") {
      enableClarityScript();
    }

    // Remove the popup after saving consent
    const overlay = document.getElementById("popup-overlay");
    if (overlay) overlay.remove();
  }

  // Function to enable the YouTube iframe dynamically
  function enableYouTubeIframe() {
    const youtubePlaceholder = document.getElementById(
      "youtube-iframe-placeholder"
    );
    if (youtubePlaceholder) {
      const youtubeIframe = document.createElement("iframe");
      youtubeIframe.src = "https://www.youtube.com/embed/oDNAsOnfZ-Q";
      youtubeIframe.width = "560";
      youtubeIframe.height = "315";
      youtubeIframe.frameBorder = "0";
      youtubeIframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      youtubeIframe.allowFullscreen = true;
      youtubePlaceholder.replaceWith(youtubeIframe);
    }
  }

  // Function to block content initially
  function blockContent() {
    // Replace YouTube iframe with a placeholder
    const youtubeIframe = document.querySelector('iframe[src*="youtube.com"]');
    if (youtubeIframe) {
      const youtubePlaceholder = document.createElement("div");
      youtubePlaceholder.id = "youtube-iframe-placeholder";
      youtubePlaceholder.style = `
        width: 560px; height: 315px; background: #f0f0f0;
        text-align: center; line-height: 315px; color: #ccc;
      `;
      youtubePlaceholder.innerText = "YouTube Video Placeholder (Consent Required)";
      youtubeIframe.replaceWith(youtubePlaceholder);
    }
  }

  // Initialize the popup and block content on page load
  document.addEventListener("DOMContentLoaded", () => {
    // Block Clarity script immediately
    blockClarityScript(); 

    // Block other content like YouTube iframe
    blockContent(); 

    // Create and display the consent popup
    createPopup(); 
  });
})();
