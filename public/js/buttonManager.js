import { BarGraphManager } from "./barGraphManager.js";
import { Utils } from './utils.js';

class ButtonManager {
    constructor() {
        this.clickedStates = {
            'button-page': null,
            'button-tab': null
        };

        this.toggleCount = 0;

        this.descriptionValue = `This is an aggregation web tool. Data is pulled in through the Yahoo Finance API and a Python web scraping application. 
            Data is processed and loaded daily. Select a data set and perspective and this details page will be updated.`;

        this.specificsValue = 'Selecting a generated bar graph will provide additional details';

        this.descriptionPanel = document.querySelector('.description-panel');
        this.specificsPanel = document.querySelector('.specifics-panel');

        if (this.descriptionPanel) {
            this.setHoverText(this.descriptionPanel, this.descriptionValue);
        } else {
            console.warn('Description panel not found.');
        }

        if (this.specificsPanel) {
            this.setHoverText(this.specificsPanel, this.specificsValue);
        } else {
            console.warn('Specifics panel not found.');
        }
    }

    setHoverText(element, hoverText) {
        let previousText = '';
        element.addEventListener('mouseover', () => {
            const textElement = element.querySelector('.text');
            if (textElement) {
                previousText = textElement.innerText;
                textElement.innerText = hoverText;
            }
        });

        element.addEventListener('mouseout', () => {
            const textElement = element.querySelector('.text');
            if (textElement) {
                textElement.innerText = previousText;   
            }
        });
    }

    handleButtonClick(button) {

        if (button.disabled !== true) {
            const buttonClass = button.classList[0];
            this.clickedStates[buttonClass] = button;


            const oppositeClass = buttonClass === 'button-page' ? 'button-tab' : 'button-page';
            const oppositeButton = this.clickedStates[oppositeClass];
            const currentButton = button;

            if (oppositeButton) {
                const id1 = button.id;
                const id2 = oppositeButton.id;
                const descriptionKey = `${id1}-${id2}`;
                const requestData = Utils.getRequestedData(id1, id2);
                const descriptions = Utils.getDiscriptions(requestData, id1, id2);
                this.descriptionPanel.innerHTML = `<span class="text">${descriptions}</span>`;

                
                const barGraphManager = new BarGraphManager(id1, id2);

            }

            const buttons = document.querySelectorAll(`.${buttonClass}`);
            buttons.forEach(btn => {
                if (btn.id !== currentButton.id && btn.classList.contains('clicked')) {
                    btn.classList.remove('clicked');

                }
            });

            button.classList.add('clicked');
        } else {
            console.warn('Button is disabled:', button.id);
        }
    }
}

export { ButtonManager };
