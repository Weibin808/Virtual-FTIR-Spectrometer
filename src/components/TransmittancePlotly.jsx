import React, { forwardRef } from "react";

// components
import Plot from "react-plotly.js";

// redux
import { useSelector } from "react-redux";

// style
import "../style/components/Plotly.css";

// this component uses the plotly library to graph transmittance spectrum data
export const TransmittancePlotly = forwardRef((props, ref) => {
  const { backgroundData } = useSelector((store) => store.backgroundData);
  const { sampleData } = useSelector((store) => store.sampleData);
  const { waveMaxSaved, waveMinSaved } = useSelector(
    (store) => store.parameter
  );
  //   const newX = sampleData.x / backgroundData.x;
  const newY = [sampleData.x.length];

  for (let i = 0; i < sampleData.x.length; i++) {
    newY[i] = sampleData.y[i] / backgroundData.y[i];

    if (newY[i] > 2) {
      newY[i] = 2;
    }

    if (newY[i] < -2) {
      newY[i] = -2;
    }
  }

  if (sampleData) {
    // https://github.com/suzil/radis-app/blob/main/frontend/src/components/CalcSpectrumPlot.tsx
    return (
      <>
        {
          <Plot
            ref={ref}
            className="plotly"
            data={[
              {
                x: sampleData.x,
                y: newY,
                type: "scatter",
                marker: { color: "#f50057" },
              },
            ]}
            layout={{
              title: "Transmittance Spectrum",
              font: { family: "Roboto", color: "#000" },
              xaxis: {
                range: [waveMinSaved, waveMaxSaved],
                title: { text: "Wavenumber (cm⁻¹)" },
                rangeslider: {
                  autorange: true,
                  yaxis: { rangemode: "auto" },
                },
                type: "linear",
              },
              yaxis: {
                autorange: true,
                title: {
                  text: "Signal",
                },
                type: "linear",
                fixedrange: false,
                // https://community.plotly.com/t/how-to-hide-axis-ticktexts-but-remain-axis-tilte/10839/2
                showticklabels: false,
              },
            }}
            // https://community.plotly.com/t/react-plotly-responsive-chart-not-working/47547
            useResizeHandler={true}
          />
        }
      </>
    );
  } else {
    return <div></div>;
  }
});
