import {Utils} from './utils.js';

class generateLabels {
    constructor(labels, dict) {
        this.labels = labels;
        this.container = document.querySelector('.label-container');
        this.width = 100;
        this.height = 100;
        this.buttons = [];
        this.buttonWidth = this.width / this.labels.length;
        this.dataframe = dict;
        this.messages = this.createDescriptionsForButtons(dict, labels);

        this.generateButtons();
        this.addListeners();
    }

    calculateButtonShape(width, labels) {
        const n = labels.length;
        const barWidth = this.width / (1.34 * n);
        const barMargin = barWidth / 3;
        return [barWidth, barMargin];
    }

    generateButtons() {
        const labelMapping = {
            price_to_max_pain: "Max Pain",
            price_to_largest_call_OI: "Largest Call OI",
            price_to_expected_high: "Expected High",
            price_to_expected_low: "Expected Low",
            all_purchases_to_sales: "All P&S",
            executive_purchases_to_sales: "Executive P&S",
            major_purchases_to_sales: "Major P&S"
        };

        const reverseLabelMapping = {};
        for (const key in labelMapping) {
            if (labelMapping.hasOwnProperty(key)) {
                reverseLabelMapping[labelMapping[key]] = key;
            }
        }

        this.labels.forEach((label, index) => {
            const button = document.createElement('button');
            button.setAttribute('id', 'label-button');

            const innerText = labelMapping[label] || label;

            button.innerHTML = `<span class="text">${innerText}</span>`;
            const shape = this.calculateButtonShape(this.width, this.labels);
            button.style.height = this.height + "%";
            button.style.width = shape[0] + "%";
            if (index <= this.labels.length - 1) {
                button.style.marginLeft = shape[1] + "%";
            }
            this.buttons.push(button);
            this.container.appendChild(button);
        });

        this.reverseLabelMapping = reverseLabelMapping;
    }

    createDescriptionsForButtons(dict, labels) {
        console.log(labels);
        const listOfList = Utils.getValuesFromDictionary(dict, labels);
        const firstValues = listOfList[0];
        const secondValues = listOfList[1];
        const identifiers = Utils.createBinaryList(secondValues);
        const percentDiff = Utils.divideListBySum(firstValues, secondValues);
        const descriptions = Utils.getDetailsForList(percentDiff, identifiers, labels, firstValues, secondValues);
        const messages = Utils.createDict(descriptions, labels);
        return messages;
    }

    handleButtonClick(currentButton) {
        console.log("button clicked");
        const buttons = document.querySelectorAll('#label-button');
        buttons.forEach(button => {
            if (button.classList.contains('clicked')) {
                button.classList.remove('clicked');
            }
        });
        currentButton.classList.add('clicked');
    }

    addListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                const textBox = document.querySelector('.specifics-panel');
                this.handleButtonClick(button);
                
                // Use reverseLabelMapping to get the original key
                const originalKey = this.reverseLabelMapping[button.innerText] || button.innerText;
                
                // Log the original key and the corresponding description
                console.log("Button text:", button.innerText);
                console.log("Original Key:", originalKey);
                console.log("Description:", this.messages[originalKey]);
                
                // Update the innerHTML of the textBox with the description
                textBox.innerHTML = `<span class="text">${this.messages[originalKey]}</span>`;
            });
        });
    }
}

export { generateLabels };
