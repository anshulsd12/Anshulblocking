<!-- Default Consent Mode config -->
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'wait_for_update': 1500
    });
    gtag('consent', 'default', {
        'region': ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH'],
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 1500
    });
    gtag('set', 'ads_data_redaction', true);
    gtag('set', 'url_passthrough', false);
    (function(){
        const s={adStorage:{storageName:"ad_storage",serialNumber:0},analyticsStorage:{storageName:"analytics_storage",serialNumber:1},functionalityStorage:{storageName:"functionality_storage",serialNumber:2},personalizationStorage:{storageName:"personalization_storage",serialNumber:3},securityStorage:{storageName:"security_storage",serialNumber:4},adUserData:{storageName:"ad_user_data",serialNumber:5},adPersonalization:{storageName:"ad_personalization",serialNumber:6}};let c=localStorage.getItem("__lxG__consent__v2");if(c){c=JSON.parse(c);if(c&&c.cls_val)c=c.cls_val;if(c)c=c.split("|");if(c&&c.length&&typeof c[14]!==undefined){c=c[14].split("").map(e=>e-0);if(c.length){let t={};Object.values(s).sort((e,t)=>e.serialNumber-t.serialNumber).forEach(e=>{t[e.storageName]=c[e.serialNumber]?"granted":"denied"});gtag("consent","update",t)}}}
        if(Math.random() < 0.05) {if (window.dataLayer && (window.dataLayer.some(e => e[0] === 'js' && e[1] instanceof Date) || window.dataLayer.some(e => e['event'] === 'gtm.js' && e['gtm.start'] == true ))) {document.head.appendChild(document.createElement('img')).src = "//clickiocdn.com/utr/gtag/?sid=242709";}}
    })();
</script>

<!-- Clickio Consent Main tag -->
<script async type="text/javascript" src="//clickiocmp.com/t/consent_242709.js"></script>
