export const Action = Object.freeze({
  StoreParams: "StoreParams",

  StoreSpectrumData: "StoreSpectrumData",

  StoreBackgroundData: "StoreBackgroundData",

  SetProgress: "SetProgress",

  SetError: "SetError",
});

// -------------------- calc_spectrum parameters --------------------
export function storeParams(params) {
  return { type: Action.StoreParams, payload: params };
}

// -------------------- store processed spectrum data --------------------
export function storeSpectrumData(spectrumData) {
  return { type: Action.StoreSpectrumData, payload: spectrumData };
}

// -------------------- store background sample data --------------------
export function storeBackgroundData(backgroundData) {
  return { type: Action.StoreBackgroundData, payload: backgroundData };
}

// -------------------- progress spinner --------------------
export function setProgress(progress) {
  return { type: Action.SetProgress, payload: progress };
}

// -------------------- error text --------------------
export function setError(error) {
  return { type: Action.SetError, payload: error };
}
