import { plotData } from "./plotData.js";

const numPlots = 10;

const plotElements = [];
let plotContainer;


addEventListener('DOMContentLoaded', () => {
  document.getElementById('refresh').addEventListener('click', refreshPlots);
  document.getElementById('clear').addEventListener('click', clearPlots);
  plotContainer = document.getElementById('plot-container');
  createPlots();
});


function createPlots() {
  const start = performance.now();
  const promises = [];
  for (let i = 0; i<numPlots; i++){
    const plotElement = document.createElement('div');
    plotContainer.appendChild(plotElement);

    promises.push(Plotly.newPlot(plotElement, plotData.data, plotData.layout));

    plotElements.push(plotElement); 
  }
  
  Promise.all(promises).then(() => {
      const end = performance.now();
      document.getElementById('create-time').innerText=`Creation time: ${end -start}ms`
  });
}


function clearPlots() {
  const start = performance.now();

  Promise.all(plotElements.map((plotElement) => Plotly.react(plotElement, [{}], {})))
    .then( () => {
      const end = performance.now();
      document.getElementById('clear-time').innerText=`Clear time: ${end -start}ms`
    });
}

function refreshPlots() {
  const start = performance.now();
  
  Promise.all(plotElements.map((plotElement) => Plotly.react(plotElement, plotData.data, plotData.layout)))
    .then( () => {
      const end = performance.now();
      document.getElementById('refresh-time').innerText=`Refresh time: ${end -start}ms`
    });
}

