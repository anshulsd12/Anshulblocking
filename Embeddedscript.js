     <div class="container">
        <h3>Consent Form</h3>
        <form onsubmit="event.preventDefault(); recordConsent();">
            <label><input type="checkbox" id="kycConsent"> I give my consent for KYC</label><br>
            <label><input type="checkbox" id="emailConsent"> I give my consent to receive Communication Email</label><br>
            <label><input type="checkbox" id="addressConsent"> I give my consent to use my address for the purpose of Product Delivery</label><br><br>
            <button type="submit">Submit</button>
        </form>
        <p id="consentMessage" class="hidden">Consent Recorded</p>
    </div>
         <link rel="canonical" href="{{ canonical_url }}">
 <script>
        function recordConsent() {
            const message = document.getElementById("consentMessage");
            message.style.display = "block";
        }
    </script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            margin: auto;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .hidden {
            display: none;
            margin-top: 10px;
            color: green;
            font-weight: bold;
        }
    </style>
