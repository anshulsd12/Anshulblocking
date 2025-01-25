(function () {
  // Function to create and display the popup
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
      <p>Would you like to view the content on this page?</p>
      <div style="margin-top: 20px;">
        <button id="allow-content" style="padding: 10px 20px; margin-right: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Yes</button>
        <button id="block-content" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">No</button>
      </div>
    `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listeners for buttons
    document.getElementById("allow-content").addEventListener("click", () => {
      allowContent();
      closePopup();
    });

    document.getElementById("block-content").addEventListener("click", () => {
      blockContent();
      closePopup();
    });
  }

  // Function to close the popup
  function closePopup() {
    const overlay = document.getElementById("popup-overlay");
    if (overlay) {
      overlay.remove();
    }
  }

  // Function to allow content
  function allowContent() {
    const content = document.getElementById("content");
    if (content) {
      content.style.display = "block"; // Show the content
    }
  }

  // Function to block content
  function blockContent() {
    const youtubeVideo = document.getElementById("youtube-video");
    const image = document.getElementById("image");
    if (youtubeVideo) youtubeVideo.remove(); // Remove the YouTube iframe
    if (image) image.remove(); // Remove the image
  }

  // Check if popup needs to be displayed
  document.addEventListener("DOMContentLoaded", () => {
    // Initially hide the content
    const content = document.getElementById("content");
    if (content) {
      content.style.display = "none";
    }

    // Create and show the popup
    createPopup();
  });
})();
