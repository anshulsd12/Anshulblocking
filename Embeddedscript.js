/* eslint-disable */
;(function () {
   const nonScriptElements = ['embed', 'iframe', 'img']
   const monitoredElements = [...nonScriptElements, 'script']
   const tagsList = [
       {
           tag: 'https://www.googletagmanager.com/gtag/js?id=G-KWC0VKDZKW&l=dataLayer&cx=c&gtm=45He51n0h1v9199743789za200',
           categories: ['NECESSARY'],
           type: 'script'
       },
       {
           tag: 'https://www.googletagmanager.com/gtm.js?id=GTM-KS3M7CSF',
           categories: ['MARKETING'],
           type: 'script'
       },
       {
           tag: 'https://js.hsforms.net/forms/embed/v2.js',
           categories: ['MARKETING'],
           type: 'script'
       },
       {
           tag: 'https://www.clarity.ms/tag/f4v1091lex',
           categories: ['MARKETING'],
           type: 'script'
       },
       {
           tag: 'https://platform.twitter.com/widgets.js',
           categories: ['ANALYTICS'],
           type: 'script'
       },
       {
           tag: 'https://www.youtube.com/embed/',
           categories: ['ANALYTICS'],
           type: 'iframe'
       },
       {
           tag: 'https://open.spotify.com/embed/',
           categories: ['ANALYTICS', 'FUNCTIONAL'],
           type: 'iframe'
       }
   ]


   // Store original Element prototype methods
   const originalSetAttribute = Element.prototype.setAttribute
   const originalSetAttributeNS = Element.prototype.setAttributeNS


   function findMatchingTag(url) {
       return tagsList.find((item) => url.includes(item.tag)) || null
   }


   function getUrlDetails(url) {
       const tagDetails = findMatchingTag(url) || {}
       return {
           categories: tagDetails.categories || [],
           type: tagDetails.type || ''
       }
   }


   function hasUserConsent(categories) {
       if (!categories || categories.length === 0) {
           return true
       }


       const cookieName = 'privyConsent'
       const defaultConsent = {
           NECESSARY: true,
           FUNCTIONAL: false,
           ANALYTICS: false,
           MARKETING: false,
           OTHERS: false
       }


       function checkConsent(consentObject) {
           if (!consentObject) return false
           return categories.every(
               (category) => consentObject[category] === true
           )
       }


       function getConsentData(source) {
           try {
               return JSON.parse(source)
           } catch (error) {
               console.error('Error parsing consent data:', error)
               return null
           }
       }


       // Check localStorage first
       const localStorageValue = localStorage.getItem(cookieName)
       if (localStorageValue) {
           const consent = getConsentData(localStorageValue)
           if (checkConsent(consent)) return true
       }


       // Then check cookies
       const cookieValue = document.cookie
           .split('; ')
           .find((row) => row.startsWith(`${cookieName}=`))
       if (cookieValue) {
           const consent = getConsentData(cookieValue.split('=')[1])
           if (checkConsent(consent)) return true
       }


       // Finally, check default consent
       return checkConsent(defaultConsent)
   }


   function addPrivacyClasses(element, categories) {
       if (categories.length) {
           element.classList.add(
               ...categories.map(
                   (category) => `privy-cmp-category-${category}`
               )
           )
       }
   }


   function handleTags(element) {
       const url = element.src || element.getAttribute('src') || ''
       if (!url) return


       const tagDetails = getUrlDetails(url)
       const categories = tagDetails.categories
       const type = tagDetails.type


       // Add privacy classes
       addPrivacyClasses(element, categories)


       if (!hasUserConsent(categories)) {
           const originalSrc = url


           if (type === 'script') {
               element.type = 'text/plain'
               element.setAttribute('data-src', originalSrc)
               element.removeAttribute('src')
               console.log(`Script blocked: ${url}`, type, categories)
           } else if (
               nonScriptElements.includes(element.tagName.toLowerCase())
           ) {
               element.setAttribute('data-src', originalSrc)
               element.removeAttribute('src')
               console.log(`Media element blocked: ${url}`, type, categories)
           }
       }
   }


   // Override setAttribute to catch dynamic changes
   Element.prototype.setAttribute = function (name, value) {
       if (
           name === 'src' &&
           monitoredElements.includes(this.tagName.toLowerCase())
       ) {
           const tagDetails = getUrlDetails(value)
           if (!hasUserConsent(tagDetails.categories)) {
               console.log(`Blocking src setting for ${this.tagName}:`, value)
               originalSetAttribute.call(this, 'data-src', value)
               if (this.tagName.toLowerCase() === 'script') {
                   originalSetAttribute.call(this, 'type', 'text/plain')
               }
               return
           }
       }
       originalSetAttribute.call(this, name, value)
   }


   // Add default styling for blocked elements
   const style = document.createElement('style')
   style.textContent = `
       iframe[data-src]:not([src]),
       img[data-src]:not([src]),
       embed[data-src]:not([src]) {
           display: block !important;
           background: #f0f0f0 !important;
           border: 1px solid #ccc !important;
           padding: 20px !important;
           text-align: center !important;
           min-height: 100px !important;
           position: relative !important;
       }
      
       iframe[data-src]:not([src])::before,
       img[data-src]:not([src])::before,
       embed[data-src]:not([src])::before {
           content: "Content blocked pending consent" !important;
           display: block !important;
           color: #666 !important;
           font-family: sans-serif !important;
       }
   `
   document.head.appendChild(style)


   function processExistingElements() {
       monitoredElements.forEach((tag) => {
           document.querySelectorAll(tag).forEach((element) => {
               handleTags(element)
           })
       })
   }


   function setupPrivacyObserver() {
       const observer = new MutationObserver((mutations) => {
           mutations.forEach((mutation) => {
               // Handle added nodes
               mutation.addedNodes.forEach((node) => {
                   if (
                       node.nodeType === 1 &&
                       monitoredElements.includes(node.tagName.toLowerCase())
                   ) {
                       handleTags(node)
                   }
               })


               // Handle attribute changes
               if (
                   mutation.type === 'attributes' &&
                   (mutation.attributeName === 'src' ||
                       mutation.attributeName === 'type')
               ) {
                   handleTags(mutation.target)
               }
           })
       })


       observer.observe(document.documentElement, {
           childList: true,
           subtree: true,
           attributes: true,
           attributeFilter: ['src', 'type']
       })
   }


   // Initialize when DOM is ready
   function initialize() {
       processExistingElements()
       setupPrivacyObserver()
       console.log('Privacy controls initialized')
   }


   if (document.readyState === 'loading') {
       document.addEventListener('DOMContentLoaded', initialize)
   } else {
       initialize()
   }


   // Export consent update function to global scope
   window.updatePrivacyConsent = function (consentObject) {
       localStorage.setItem('privyConsent', JSON.stringify(consentObject))
       processExistingElements()
   }
})()
