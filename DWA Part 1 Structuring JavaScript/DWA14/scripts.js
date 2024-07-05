import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

/**
 * A simple tally counter application using the Lit framework.
 * @extends {LitElement}
 */
class TallyCounter extends LitElement {
  /**
   * Define reactive properties for the component.
   */
  static properties = {
    count: { type: Number },
    minCount: { type: Number },
    maxCount: { type: Number },
    state: { type: String }
  }

  /**
   * Creates an instance of TallyApp.
   */
  constructor() {
    super(),
    this.count = 0;
    this.minCount = 0;
    this.maxCount = 10;
    this.state = 'Normal';
  };

  /**
   * Update the state based on the current count.
   */
  updateState() {
    if (this.count <= this.minCount) {
      this.state = 'Minimum Reached'
    } else if (this.count >= this.maxCount) {
      this.state = 'Maximum Reached'
    } else {
      this.state = 'Normal'
    }
    this.requestUpdate();
  };

  /**
   * Increment the counter value.
   */
  increase() {
    if (this.count < this.maxCount) {
      this.count += 1;
      this.updateState();
    };
  };

  /**
   * Decrease the counter value.
   */
  decrease() {
    if (this.count > this.minCount) {
      this.count -= 1;
      this.updateState();
    };
  };

  /**
   * Reset counter to 0
   */
  reset() {
  his.count = 0;
  this.updateState();

  };

  render() {
    return html`
    <label id="countlabel" class="countlabel">${this.count}</label>
    <br />
    <div class="buttons">
      <sl-button @click="${this.decrease}" disabled>Subtract</sl-button>
      <sl-button @click="${this.reset}">Reset</sl-button>
      <sl-button @click="${this.increase}">Add</sl-button>
    </div>
    <sl-alert variant="primary" closable class="alert-closable">
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      Counter has been reset
    </sl-alert>
    `
  }
};
customElements.define('tally-counter', TallyCounter);
//---------------------...ooo000 END OF FILE 000ooo...------------------------//