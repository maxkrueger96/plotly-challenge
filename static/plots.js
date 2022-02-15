function fetchData(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var matchDict = metadata.filter(sampleDict => sampleDict.id == sample);
    var match = matchDict[0];
    var dataPanel = d3.select("#sample-metadata");

    dataPanel.html("");

    Object.entries(match).forEach(([key,value]) => {
      dataPanel.append("h5").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function makePlots(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var matchDict = samples.filter(sampleDict => sampleDict.id == sample);
    var match = matchDict[0];
    var otu_ids = match.otu_ids;
    var otu_labels = match.otu_labels;
    var sample_vals = match.sample_values;

    var ylabels = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
    var barChart = {
      title: "The 10 Most Common Bacteria"
    }
    var barData = [
      {
        type: "bar",
        orientation: "h",
        x: sample_vals.slice(0,10).reverse(),
        y: ylabels,
        text: otu_labels.slice(0,10).reverse()
      }
    ];

    var bubbleChart = {
      title: "Different Kinds of Bacteria in Each Sample",
      xaxis: {title: "Operational Taxonomy Unit ID"},
      margin: {t: 50},
      yaxis: {title: "Number of Cultures"}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_vals,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_vals,
          color: otu_ids,
          colorscale: "algae"
        }
      }
    ];

    Plotly.newPlot("bar",barData,barChart);
    Plotly.newPlot("bubble",bubbleData,bubbleChart);
  });
}

function pickId(newId) {
  fetchData(newId);
  makePlots(newId);
}

function init() {
  var picker = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    console.log(data)
    var names = data.names;
    names.forEach((sample) => {
      picker.append("option").text(sample).property("value",sample);
    });

    var firstId = names[0];
    pickId(firstId);
  });
}

init();