import React from "react";

// components
import Fetch from "../components/Fetch";
import { ProcessedPlotly } from "../components/ProcessedPlotly";
import BackgroundPlotly from "../components/BackgroundPlotly";

// inputs
import Beamsplitter from "../components/inputs/Beamsplitter";
import Detector from "../components/inputs/Detector";
import Medium from "../components/inputs/Medium";
import Molecule from "../components/inputs/Molecule";
import Pressure from "../components/inputs/Pressure";
import Resolution from "../components/inputs/Resolution";
import Scan from "../components/inputs/Scan";
import Source from "../components/inputs/Source";
import Wavenumber from "../components/inputs/Wavenumber";
import Window from "../components/inputs/Window";
import ZeroFill from "../components/inputs/ZeroFill";

// redux
import { useSelector } from "react-redux";

// style
import "../style/routes/ExperimentalSetup.css";

export default function ExperimentalSetup() {
  // parameters set by user
  const {
    beamsplitter,
    detector,
    medium,
    molecule,
    pressure,
    resolution,
    scan,
    source,
    waveMax,
    waveMin,
    window,
    zeroFill,
  } = useSelector((store) => store.parameter);

  // progress and error values
  const { progress } = useSelector((store) => store.progress);
  const { error, errorText } = useSelector((store) => store.error);

  return (
    <div id="experimental-setup">
      <div id="form">
        <div className="col">
          <div className="parameter">
            <Wavenumber />
          </div>

          <div className="parameter">
            <Pressure />
          </div>

          <div className="parameter">
            <Scan />
          </div>

          <div className="parameter">
            <Molecule />
          </div>

          <div className="parameter">
            <Resolution />
          </div>

          <div className="parameter">
            <ZeroFill />
          </div>
        </div>
        <div className="col">
          <div className="parameter">
            <Source />
          </div>

          <div className="parameter">
            <Beamsplitter />
          </div>

          <div className="parameter">
            <Window />
          </div>

          <div className="parameter">
            <Detector />
          </div>

          <div className="parameter">
            <Medium />
          </div>

          <div className="fetch-zone">
            <Fetch
              type="spectrum"
              params={{
                beamsplitter,
                detector,
                medium,
                molecule,
                pressure,
                resolution,
                scan,
                source,
                waveMax,
                waveMin,
                window,
                zeroFill,
              }}
              fetchURL={"http://localhost:5000/spectrum"}
              // fetchURL={"https://api.ftir.rastonlab.org/spectrum"}
              buttonText="Generate Processed Spectrum"
              // isAir={medium}
            />
            <Fetch
              type="background"
              params={{
                beamsplitter,
                detector,
                medium,
                molecule,
                pressure,
                resolution,
                scan,
                source,
                waveMax,
                waveMin,
                window,
                zeroFill,
              }}
              fetchURL={"http://localhost:5000/background"}
              // fetchURL={"https://api.ftir.rastonlab.org/background"}
              buttonText={"Generate Background Sample"}
              // isAir={medium}
            />
          </div>
        </div>
      </div>
      <div id="graph-and-error" className="col">
        {progress && <div id="spinner" />}
        {error && (
          <div id="error">
            <p style={{ fontSize: 30 }}>{errorText}</p>
          </div>
        )}
        {!progress && !error && <ProcessedPlotly />}
        {!progress && !error && <BackgroundPlotly />}
      </div>
    </div>
  );
}

// export default forwardRef(ExperimentalSetup);
