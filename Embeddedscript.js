(function () {
  // Function to block Clarity script by preventing it from loading
  function blockClarityScript() {
    const clarityScriptSelector = 'script[src*="clarity.ms"]';

    // Check if the Clarity script is in the DOM and remove it if found
    const clarityScript = document.querySelector(clarityScriptSelector);
    if (clarityScript) {
      clarityScript.remove(); // Remove script tag to ensure it doesn't load
    }

    // Monitor new script tags dynamically added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === "SCRIPT" && node.src.includes("clarity.ms")) {
            node.remove(); // Remove Clarity script if added dynamically
          }
        });
      });
    });

    observer.observe(document.head, { childList: true });
  }

  // Function to enable the Clarity script after consent
  function enableClarityScript() {
    const clarityScript = document.createElement("script");
    clarityScript.src = "https://www.clarity.ms/tag/f4v1091lex";
    clarityScript.async = true;
    document.head.appendChild(clarityScript); // Dynamically load the script
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
      <h2 style="margin-bottom: 10px;">Cookie Consent</h2>
      <p>Do you consent to load the Clarity Analytics script?</p>
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
      enableClarityScript(); // Load Clarity script
      document.getElementById("popup-overlay").remove(); // Remove popup
    });

    document.getElementById("deny-consent").addEventListener("click", () => {
      document.getElementById("popup-overlay").remove(); // Remove popup
    });
  }

  // On page load
  document.addEventListener("DOMContentLoaded", () => {
    blockClarityScript(); // Block script and cookies initially
    createPopup(); // Show consent popup
  });
})();
