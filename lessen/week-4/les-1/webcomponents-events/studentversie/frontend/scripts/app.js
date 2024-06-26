import {template} from "./modules/template.js";
import {Cirkel} from "./components/cirkel.js";
import {Vierkant} from "./components/vierkant.js";

class App extends HTMLElement {

    shadowRoot;
    templateId = 'app-click-cirkel-tpl';
    templateId2 = 'app-click-vierkant-tpl';

    elementId = 'app-click-cirkel';
    elementId2 = 'app-vierkant-cirkel';
    constructor() {
        super(); // always call super() first in the ctor.
        this.shadowRoot = this.attachShadow({mode: 'open'})
        this.init();
    }

    init() {
        //plaats alle HTML templates in de DOM
        template.attachTemplates();
    }

    connectedCallback() {
        this.applyTemplate();
        this.attachStyling();
        this.applyEventlisteners();
        this.applyEventlisteners2();
        console.log(`De huidige versie van de applicatie is: 
        ${this.getAttribute('versie')}`)
    }

    applyTemplate() {
        let appTemplate = document.getElementById(this.templateId2);
        let clone = appTemplate.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
    }

    // app.js
    attachStyling(){
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "stylesheets/app.css");
        this.shadowRoot.appendChild(linkElem);
    }

    applyEventlisteners(){
        this.addEventListener('cirkelClick', this.cirkelClickedHandler);
    }
    applyEventlisteners2(){
        this.addEventListener('vierkantClick', this.vierkantClickedHandler);
    }
    cirkelClickedHandler(event) {
        let cirkelComponent = this.shadowRoot.getElementById('cirkel-1');
        cirkelComponent.setState('cirkelClicks', ++cirkelComponent.state.cirkelClicks);
    }
    vierkantClickedHandler(event) {
        let cierkantComponent = this.shadowRoot.getElementById('click-vierkant');
        cierkantComponent.setState('vierkantClicks', ++cierkantComponent.state.vierkantClicks);
    }

}

customElements.define('app-click-cirkel', App);
customElements.define('app-vierkant-cirkel', App);
