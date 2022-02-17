function makeGauge(wfreq) {
    var gaugeChart = {
        width: 500,
        height: 500
    };

    var gaugeData = [
        {
            domain: { x: [0, 7], y: [0, 1]},
            value: wfreq,
            type: "indicator",
            mode: "gauge+number",
            title: {text: "<span style='color:purple'><b>Belly Button Washing Frequency</b></span> <br><span style='font-size:0.75em;color:pink'>Weekly Washes</span>"},
            gauge: {
                axis: {range: [null,7]},
                steps: [
                    {range: [0,1], color: "rgba(74,65,42,0.14)"},
                    {range: [1,2], color: "rgba(74,65,42,0.28)"},
                    {range: [2,3], color: "rgba(74,65,42,0.42)"},
                    {range: [3,4], color: "rgba(74,65,42,0.57)"},
                    {range: [4,5], color: "rgba(74,65,42,0.71)"},
                    {range: [5,6], color: "rgba(74,65,42,0.85)"},
                    {range: [6,7], color: "rgba(74,65,42,1)"}
                ],
                threshold: {
                    line: {color: "rgba(144,238,144)",width:3},
                    thickness: 1,
                    value: wfreq
                }
            }
        }
    ]

    var gauge = document.getElementById("gauge");
    Plotly.newPlot(gauge,gaugeData,gaugeChart);
}