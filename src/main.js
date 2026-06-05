import styles from './style.css?inline';

(function () {
  // 1. Guard against double initialization
  if (window.__MyWidgetInitialized) return;
  window.__MyWidgetInitialized = true;

  // 2. Read configuration from the <script> tag that loaded this bundle.js
  const currentScript = document.querySelector('script[data-plugin-name="external-script-integration"]');

  const config = {
    apiKey: currentScript ? currentScript.getAttribute('data-api-key') : 'default-key',
    themeColor: currentScript ? currentScript.getAttribute('data-theme-color') : '#0070f3',
    title: currentScript ? currentScript.getAttribute('data-title') : 'Feedback'
  };

  // 3. Create a host element on the client's page
  const hostElement = document.createElement('div');
  hostElement.id = 'my-custom-widget-root';

  // Basic widget positioning (widget floats at bottom-right)
  hostElement.style.position = 'fixed';
  hostElement.style.bottom = '24px';
  hostElement.style.right = '24px';
  hostElement.style.zIndex = '2147483647'; // Above all site elements

  document.body.appendChild(hostElement);

  // 4. Initialize Shadow DOM inside the host element
  const shadowRoot = hostElement.attachShadow({ mode: 'open' });

  // 5. Build the HTML structure.
  // Note: we pass config.themeColor into the CSS variable --primary-color
  shadowRoot.innerHTML = `
    <style>
      :host {
        --primary-color: ${config.themeColor};
      }
      ${styles}
    </style>

    <div class="widget-wrapper">
      <div class="widget-header">${config.title}</div>
      <form id="widget-form">
        <div class="form-group">
          <input type="email" id="widget-email" required placeholder="Your Email" />
        </div>
        <div class="form-group">
          <textarea id="widget-message" required placeholder="Your message..." rows="3"></textarea>
        </div>
        <button type="submit" class="widget-submit-btn">Send</button>
      </form>
    </div>
  `;

  // 6. Event handling (form logic)
  const form = shadowRoot.getElementById('widget-form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the host page from reloading

    const emailInput = shadowRoot.getElementById('widget-email');
    const messageInput = shadowRoot.getElementById('widget-message');
    const submitBtn = shadowRoot.querySelector('.widget-submit-btn');

    // Disable the button while submitting
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    // Payload to send
    const payload = {
      apiKey: config.apiKey, // Site identifier
      email: emailInput.value,
      message: messageInput.value,
      url: window.location.href // Capture which client page the form was submitted from
    };

    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("payload", payload)

      // Show success message
      shadowRoot.querySelector('.widget-wrapper').innerHTML = `
        <div class="success-message">
          <h3>Thank you!</h3>
          <p>Your message has been sent successfully.</p>
        </div>
      `;

    } catch (error) {
      console.error('Sending error:', error);
      alert('Oops, something went wrong. Please try again later.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Send';
    }
  });
})();
