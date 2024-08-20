import {HorizontalBarGraph} from './horizontalBarGraph.js';
import {generateLabels} from './generateLabels.js';
import {Utils} from './utils.js';

class BarGraphManager {
  constructor(button1Id, button2Id) {
    this.button1Id = button1Id;
    this.button2Id = button2Id;
    this.chartData = Utils.getRequestedData(this.button1Id, this.button2Id);
  

    this.createHorizontalBarGraph(this.chartData);
    this.createHorizontalBarLabels(this.chartData);
  }

  

  createHorizontalBarGraph(dict) {    
    const canvasContainer = document.getElementsByClassName('dynamic-box-screen')[0];
    if (canvasContainer.querySelector('canvas')) {
      canvasContainer.removeChild(canvasContainer.querySelector('canvas'));
    }
    const barGraph = new HorizontalBarGraph(dict);

  }

  createHorizontalBarLabels(dict) {
    const labels = Utils.extractKeys(dict);
    const labelContainer = document.querySelector('.label-container');
    const buttons = labelContainer.querySelectorAll('button');
    buttons.forEach(button => {
        labelContainer.removeChild(button);
    });
    const labeler = new generateLabels(labels,dict);
  }
}

export {BarGraphManager};
