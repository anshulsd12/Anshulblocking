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
        <!-- Consent for image -->
        <div style="margin-bottom: 15px;">
          <p>Image:</p>
          <label>
            <input type="radio" name="image-consent" value="yes"> Yes
          </label>
          <label>
            <input type="radio" name="image-consent" value="no" checked> No
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
    const imageConsent = document.querySelector('input[name="image-consent"]:checked').value;

    // Show or hide the YouTube video based on consent
    const youtubeVideo = document.getElementById("youtube-video");
    if (youtubeVideo) {
      youtubeVideo.style.display = youtubeConsent === "yes" ? "block" : "none";
    }

    // Show or hide the image based on consent
    const image = document.getElementById("image");
    if (image) {
      image.style.display = imageConsent === "yes" ? "block" : "none";
    }

    // Remove the popup
    const overlay = document.getElementById("popup-overlay");
    if (overlay) overlay.remove();
  }

  // Initialize the popup on page load
  document.addEventListener("DOMContentLoaded", () => {
    // Initially hide the content
    const youtubeVideo = document.getElementById("youtube-video");
    const image = document.getElementById("image");

    if (youtubeVideo) youtubeVideo.style.display = "none";
    if (image) image.style.display = "none";

    // Create and show the popup
    createPopup();
  });
})();
