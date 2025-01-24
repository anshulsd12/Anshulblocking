<script>
    (function() {
        // Function to create and display the popup
        function createPopup() {
            const overlay = document.createElement('div');
            overlay.id = 'overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0, 0, 0, 0.5)';
            overlay.style.zIndex = '999';
            document.body.appendChild(overlay);

            const popup = document.createElement('div');
            popup.id = 'popup';
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.background = '#fff';
            popup.style.padding = '20px';
            popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            popup.style.borderRadius = '8px';
            popup.style.textAlign = 'center';
            popup.style.zIndex = '1000';
            popup.innerHTML = `
                <p>Which content would you like to allow?</p>
                <button id="allowVideo">Allow YouTube Video</button>
                <button id="allowImage">Allow Image</button>
                <button id="allowBoth">Allow Both</button>
            `;
            document.body.appendChild(popup);

            // Add event listeners for the buttons
            document.getElementById('allowVideo').addEventListener('click', function() {
                loadContent('video');
                closePopup();
            });
            document.getElementById('allowImage').addEventListener('click', function() {
                loadContent('image');
                closePopup();
            });
            document.getElementById('allowBoth').addEventListener('click', function() {
                loadContent('both');
                closePopup();
            });
        }

        // Function to dynamically load the content based on user's choice
        function loadContent(choice) {
            const contentDiv = document.createElement('div');
            contentDiv.id = 'content';

            if (choice === 'video' || choice === 'both') {
                const iframe = document.createElement('iframe');
                iframe.width = '560';
                iframe.height = '315';
                iframe.src = 'https://www.youtube.com/embed/oDNAsOnfZ-Q';
                iframe.title = 'YouTube video player';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                contentDiv.appendChild(iframe);
            }

            if (choice === 'image' || choice === 'both') {
                const img = document.createElement('img');
                img.src = 'https://www.tama.com/common/product_artist_file/file/pen_Starclassic2023.webp';
                img.alt = 'Starclassic 2023';
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.marginTop = '20px';
                img.style.border = '2px solid #ccc';
                img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                contentDiv.appendChild(img);
            }

            // Append the dynamically created content to the body
            document.body.appendChild(contentDiv);
        }

        // Function to close the popup and overlay
        function closePopup() {
            document.getElementById('popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        // Initialize the popup when the page loads
        window.onload = function() {
            createPopup();
        };
    })();
</script>
