// (function () {
//   // Function to create and display the Cookie Manager popup
//   function createPopup() {
//     // Create overlay
//     const overlay = document.createElement("div");
//     overlay.id = "popup-overlay";
//     overlay.style.position = "fixed";
//     overlay.style.top = 0;
//     overlay.style.left = 0;
//     overlay.style.width = "100vw";
//     overlay.style.height = "100vh";
//     overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
//     overlay.style.zIndex = 1000;
//     overlay.style.display = "flex";
//     overlay.style.justifyContent = "center";
//     overlay.style.alignItems = "center";
//     overlay.style.color = "#fff";
//     overlay.style.fontFamily = "Arial, sans-serif";

//     // Create popup box
//     const popup = document.createElement("div");
//     popup.id = "popup";
//     popup.style.backgroundColor = "#333";
//     popup.style.padding = "20px";
//     popup.style.borderRadius = "10px";
//     popup.style.textAlign = "center";
//     popup.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
//     popup.innerHTML = `
//       <h2 style="margin-bottom: 10px;">Cookie Manager</h2>
//       <p>Manage your consent for the following content:</p>
//       <div style="margin-top: 20px; text-align: left;">
//         <!-- Consent for YouTube video -->
//         <div style="margin-bottom: 15px;">
//           <p>YouTube:</p>
//           <label>
//             <input type="radio" name="youtube-consent" value="yes"> Yes
//           </label>
//           <label>
//             <input type="radio" name="youtube-consent" value="no" checked> No
//           </label>
//         </div>
//         <!-- Consent for Image -->
//         <div style="margin-bottom: 15px;">
//           <p>Image:</p>
//           <label>
//             <input type="radio" name="image-consent" value="yes"> Yes
//           </label>
//           <label>
//             <input type="radio" name="image-consent" value="no" checked> No
//           </label>
//         </div>
//         <!-- Consent for Twitter Like Button -->
//         <div style="margin-bottom: 15px;">
//           <p>Twitter Like Button:</p>
//           <label>
//             <input type="radio" name="twitter-consent" value="yes"> Yes
//           </label>
//           <label>
//             <input type="radio" name="twitter-consent" value="no" checked> No
//           </label>
//         </div>
//       </div>
//       <button id="save-consent" style="padding: 10px 20px; margin-top: 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Save Consent</button>
//     `;

//     // Append popup to overlay
//     overlay.appendChild(popup);

//     // Append overlay to body
//     document.body.appendChild(overlay);

//     // Add event listener for the Save Consent button
//     document.getElementById("save-consent").addEventListener("click", saveConsent);
//   }

//   // Function to save consent and apply it to the content
//   function saveConsent() {
//     // Get consent values
//     const youtubeConsent = document.querySelector('input[name="youtube-consent"]:checked').value;
//     const imageConsent = document.querySelector('input[name="image-consent"]:checked').value;
//     const twitterConsent = document.querySelector('input[name="twitter-consent"]:checked').value;

//     // Show or hide the YouTube video based on consent
//     const youtubeVideoPlaceholder = document.getElementById("youtube-video-placeholder");
//     if (youtubeVideoPlaceholder && youtubeConsent === "yes") {
//       const youtubeVideo = document.createElement("iframe");
//       youtubeVideo.id = "youtube-video";
//       youtubeVideo.width = "560";
//       youtubeVideo.height = "315";
//       youtubeVideo.src = "https://www.youtube.com/embed/oDNAsOnfZ-Q";
//       youtubeVideo.title = "YouTube video";
//       youtubeVideo.frameborder = "0";
//       youtubeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
//       youtubeVideo.allowfullscreen = true;
//       youtubeVideoPlaceholder.replaceWith(youtubeVideo); // Replace placeholder with iframe
//     } else if (youtubeVideoPlaceholder) {
//       youtubeVideoPlaceholder.remove(); // Remove placeholder if no consent
//     }

//     // Show or hide the image based on consent
//     const imagePlaceholder = document.getElementById("image-placeholder");
//     if (imagePlaceholder && imageConsent === "yes") {
//       const image = document.createElement("img");
//       image.id = "image";
//       image.src = "https://www.tama.com/common/product_artist_file/file/pen_Starclassic2023.webp";
//       image.alt = "Drums Image";
//       imagePlaceholder.replaceWith(image); // Replace placeholder with image
//     } else if (imagePlaceholder) {
//       imagePlaceholder.remove(); // Remove placeholder if no consent
//     }

//     // Show or hide the Twitter Like button based on consent
//     const twitterLikeButtonPlaceholder = document.getElementById("twitter-like-button-placeholder");
//     if (twitterLikeButtonPlaceholder && twitterConsent === "yes") {
//       const twitterLikeButton = document.createElement("a");
//       twitterLikeButton.href = "https://twitter.com/intent/like?tweet_id=1234567890";
//       twitterLikeButton.classList.add("twitter-like-button");
//       twitterLikeButton.setAttribute("data-show-count", "true");
//       twitterLikeButton.setAttribute("data-size", "large");
//       twitterLikeButton.innerText = "Like";
//       twitterLikeButtonPlaceholder.replaceWith(twitterLikeButton); // Replace placeholder with like button
//     } else if (twitterLikeButtonPlaceholder) {
//       twitterLikeButtonPlaceholder.remove(); // Remove placeholder if no consent
//     }

//     // Remove the popup
//     const overlay = document.getElementById("popup-overlay");
//     if (overlay) overlay.remove();
//   }

//   // Initialize the popup on page load
//   document.addEventListener("DOMContentLoaded", () => {
//     // Initially hide the content by using placeholders
//     const contentDiv = document.getElementById("content");

//     contentDiv.innerHTML = `
//       <!-- YouTube Video Placeholder -->
//       <div id="youtube-video-placeholder" style="width: 560px; height: 315px; background: #f0f0f0; text-align: center; line-height: 315px; color: #ccc;">
//         YouTube Video Placeholder (Consent Required)
//       </div>

//       <!-- Image Placeholder -->
//       <div id="image-placeholder" style="width: 300px; height: 200px; background: #f0f0f0; text-align: center; line-height: 200px; color: #ccc;">
//         Image Placeholder (Consent Required)
//       </div>

//       <!-- Twitter Like Button Placeholder -->
//       <div id="twitter-like-button-placeholder" style="width: 150px; height: 40px; background: #f0f0f0; text-align: center; line-height: 40px; color: #ccc;">
//         Twitter Like Button Placeholder (Consent Required)
//       </div>
//     `;

//     // Create and show the popup
//     createPopup();
//   });
// })();
document.addEventListener("DOMContentLoaded", function () {
  // Create the popup
  const popup = document.createElement("div");
  popup.id = "consent-popup";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "9999";

  popup.innerHTML = `
    <h2>Cookie Manager</h2>
    <p>Please provide your consent for the following:</p>
    <div>
      <label>
        <input type="checkbox" id="consent-youtube">
        Consent for YouTube Video
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" id="consent-image">
        Consent for Image
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" id="consent-twitter">
        Consent for Twitter Like Button
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" id="consent-pair-1">
        Consent for Scripts 1 & 2 (iZooto)
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" id="consent-pair-2">
        Consent for Scripts 3 & 4 (iZooto)
      </label>
    </div>
    <button id="consent-submit">Save</button>
  `;

  document.body.appendChild(popup);

  // Handle consent submission
  document.getElementById("consent-submit").addEventListener("click", function () {
    const consentYouTube = document.getElementById("consent-youtube").checked;
    const consentImage = document.getElementById("consent-image").checked;
    const consentTwitter = document.getElementById("consent-twitter").checked;
    const consentPair1 = document.getElementById("consent-pair-1").checked;
    const consentPair2 = document.getElementById("consent-pair-2").checked;

    // Save consent to localStorage
    localStorage.setItem("consentYouTube", consentYouTube);
    localStorage.setItem("consentImage", consentImage);
    localStorage.setItem("consentTwitter", consentTwitter);
    localStorage.setItem("consentPair1", consentPair1);
    localStorage.setItem("consentPair2", consentPair2);

    // Remove the popup
    popup.remove();

    // Load content and scripts based on consent
    if (consentYouTube) {
      loadYouTubeVideo();
    }
    if (consentImage) {
      loadImage();
    }
    if (consentTwitter) {
      loadTwitterButton();
    }
    if (consentPair1) {
      loadScript("https://cdn.izooto.com/scripts/sdk/izooto.js", "izootoSdk1");
      loadIframe("https://cdn.izooto.com/scripts/sak/iz_setcid.html?v=1", "izsetcgid");
    }
    if (consentPair2) {
      loadScript("https://cdn.izooto.com/scripts/11212a076a9bffdc30d9fad44a7ba74b4c6259ff.js");
      loadScript("https://cdn.izooto.com/scripts/sdk/izooto.js", "izootoSdk2");
    }
  });

  // Utility function to load a script dynamically
  function loadScript(src, id = "") {
    if (id && document.getElementById(id)) return; // Prevent duplicate loading
    const script = document.createElement("script");
    script.src = src;
    if (id) script.id = id;
    document.head.appendChild(script);
  }

  // Utility function to load an iframe dynamically
  function loadIframe(src, id) {
    if (document.getElementById(id)) return; // Prevent duplicate loading
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.id = id;
    iframe.style.visibility = "hidden";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "0px";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  // Utility function to load the YouTube video
  function loadYouTubeVideo() {
    const placeholder = document.getElementById("youtube-video-placeholder");
    placeholder.innerHTML = `
      <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/oDNAsOnfZ-Q" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
    `;
  }

  // Utility function to load the image
  function loadImage() {
    const placeholder = document.getElementById("image-placeholder");
    placeholder.innerHTML = `
      <img src="https://www.tama.com/common/product_artist_file/file/pen_Starclassic2023.webp" alt="Example Image" width="300">
    `;
  }

  // Utility function to load the Twitter like button
  function loadTwitterButton() {
    const placeholder = document.getElementById("twitter-like-button-placeholder");
    placeholder.innerHTML = `
      <a href="https://twitter.com/intent/like?tweet_id=123456789" target="_blank">
        <img src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png" alt="Twitter Like Button" width="40">
      </a>
    `;
  }

  // Check saved consent on page load
  const savedConsentYouTube = localStorage.getItem("consentYouTube") === "true";
  const savedConsentImage = localStorage.getItem("consentImage") === "true";
  const savedConsentTwitter = localStorage.getItem("consentTwitter") === "true";
  const savedConsentPair1 = localStorage.getItem("consentPair1") === "true";
  const savedConsentPair2 = localStorage.getItem("consentPair2") === "true";

  if (savedConsentYouTube) {
    loadYouTubeVideo();
  }
  if (savedConsentImage) {
    loadImage();
  }
  if (savedConsentTwitter) {
    loadTwitterButton();
  }
  if (savedConsentPair1) {
    loadScript("https://cdn.izooto.com/scripts/sdk/izooto.js", "izootoSdk1");
    loadIframe("https://cdn.izooto.com/scripts/sak/iz_setcid.html?v=1", "izsetcgid");
  }
  if (savedConsentPair2) {
    loadScript("https://cdn.izooto.com/scripts/11212a076a9bffdc30d9fad44a7ba74b4c6259ff.js");
    loadScript("https://cdn.izooto.com/scripts/sdk/izooto.js", "izootoSdk2");
  }
});
