import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beamsplitter: "AR_ZnSe",
  detector: "MCT",
  medium: "Air",
  molecule: "HCN",
  pressure: 0.1,
  resolution: 0.125,
  scan: 16,
  source: 1200,
  waveMin: 400,
  waveMinSaved: null,
  waveMax: 4000,
  waveMaxSaved: null,
  window: "ZnSe",
  zeroFill: 1,
};

const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setBeamsplitter: (state, { payload }) => {
      state.beamsplitter = payload;
    },
    setDetector: (state, { payload }) => {
      state.detector = payload;
    },
    setMedium: (state, { payload }) => {
      state.medium = payload;
    },
    setMolecule: (state, { payload }) => {
      state.molecule = payload;
    },
    setPressure: (state, { payload }) => {
      state.pressure = payload;
    },
    setResolution: (state, { payload }) => {
      state.resolution = payload;
    },
    setScan: (state, { payload }) => {
      state.scan = payload;
    },
    setSource: (state, { payload }) => {
      state.source = payload;
    },
    setWaveMin: (state, { payload }) => {
      state.waveMin = payload;
    },
    setWaveMax: (state, { payload }) => {
      state.waveMax = payload;
    },
    setWaveSaved: (state, { payload }) => {
      state.waveMinSaved = payload[0];
      state.waveMaxSaved = payload[1];
    },
    setWindow: (state, { payload }) => {
      state.window = payload;
    },
    setZeroFill: (state, { payload }) => {
      state.zeroFill = payload;
    },
  },
});

export const {
  setBeamsplitter,
  setDetector,
  setMedium,
  setMolecule,
  setPressure,
  setResolution,
  setScan,
  setSource,
  setWaveMin,
  setWaveMax,
  setWaveSaved,
  setWindow,
  setZeroFill,
} = parameterSlice.actions;

export default parameterSlice.reducer;
