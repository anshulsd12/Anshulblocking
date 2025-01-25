(function () {
  // Function to create and display a popup for specific content
  function createPopup(contentType, onAllow, onBlock) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
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
    popup.className = "popup";
    popup.style.backgroundColor = "#333";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    popup.innerHTML = `
      <h2 style="margin-bottom: 10px;">Consent Required</h2>
      <p>Would you like to view the ${contentType}?</p>
      <div style="margin-top: 20px;">
        <button id="allow-${contentType}" style="padding: 10px 20px; margin-right: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Yes</button>
        <button id="block-${contentType}" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">No</button>
      </div>
    `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listeners for buttons
    document.getElementById(`allow-${contentType}`).addEventListener("click", () => {
      onAllow();
      closePopup(overlay);
    });

    document.getElementById(`block-${contentType}`).addEventListener("click", () => {
      onBlock();
      closePopup(overlay);
    });
  }

  // Function to close the popup
  function closePopup(overlay) {
    if (overlay) {
      overlay.remove();
    }
  }

  // Function to initialize the consent logic
  function initializeConsent() {
    const youtubeVideo = document.getElementById("youtube-video");
    const image = document.getElementById("image");

    // Ask for consent for YouTube video
    if (youtubeVideo) {
      createPopup(
        "YouTube video",
        () => {
          youtubeVideo.style.display = "block"; // Show the video
        },
        () => {
          youtubeVideo.remove(); // Remove the video
        }
      );
    }

    // Ask for consent for Image
    if (image) {
      createPopup(
        "image",
        () => {
          image.style.display = "block"; // Show the image
        },
        () => {
          image.remove(); // Remove the image
        }
      );
    }
  }

  // Check if consent logic needs to be initialized
  document.addEventListener("DOMContentLoaded", () => {
    // Initially hide both the image and video
    const youtubeVideo = document.getElementById("youtube-video");
    const image = document.getElementById("image");

    if (youtubeVideo) youtubeVideo.style.display = "none";
    if (image) image.style.display = "none";

    // Initialize the consent process
    initializeConsent();
  });
})();
