(function () {
  // Function to create and display a single popup for both content types
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
      <h2 style="margin-bottom: 10px;">Consent Required</h2>
      <p>Please provide your consent for the following content:</p>
      <div style="margin-top: 20px;">
        <!-- Consent for YouTube video -->
        <div style="margin-bottom: 15px;">
          <p>Do you want to view the YouTube video?</p>
          <button id="allow-youtube" style="padding: 10px 20px; margin-right: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Yes</button>
          <button id="block-youtube" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">No</button>
        </div>
        <!-- Consent for image -->
        <div>
          <p>Do you want to view the image?</p>
          <button id="allow-image" style="padding: 10px 20px; margin-right: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Yes</button>
          <button id="block-image" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">No</button>
        </div>
      </div>
    `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listeners for YouTube video buttons
    document.getElementById("allow-youtube").addEventListener("click", () => {
      allowContent("youtube-video");
    });

    document.getElementById("block-youtube").addEventListener("click", () => {
      blockContent("youtube-video");
    });

    // Add event listeners for image buttons
    document.getElementById("allow-image").addEventListener("click", () => {
      allowContent("image");
    });

    document.getElementById("block-image").addEventListener("click", () => {
      blockContent("image");
    });
  }

  // Function to allow content
  function allowContent(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
      content.style.display = "block"; // Show the content
    }
    checkAllConsentGiven();
  }

  // Function to block content
  function blockContent(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
      content.remove(); // Remove the content
    }
    checkAllConsentGiven();
  }

  // Function to check if all consent decisions have been made
  function checkAllConsentGiven() {
    const youtubeDecisionMade =
      document.getElementById("allow-youtube") === null &&
      document.getElementById("block-youtube") === null;
    const imageDecisionMade =
      document.getElementById("allow-image") === null &&
      document.getElementById("block-image") === null;

    // If decisions for both content types are made, close the popup
    if (youtubeDecisionMade && imageDecisionMade) {
      const overlay = document.getElementById("popup-overlay");
      if (overlay) overlay.remove();
    }
  }

  // Check if popup needs to be displayed
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
