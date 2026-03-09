document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page loaded successfully.');

    // GA4 Event Tracking for CTA Buttons
    const trackCTA = (elementId, location) => {
        const button = document.getElementById(elementId);
        if (button) {
            button.addEventListener('click', () => {
                if (typeof gtag === 'function') {
                    gtag('event', 'cta_click', {
                        'cta_location': location
                    });
                    console.log(`GA4 Event Sent: cta_click from ${location}`);
                }
            });
        }
    };

    trackCTA('cta-top', 'top');
    trackCTA('cta-bottom', 'bottom');
});
