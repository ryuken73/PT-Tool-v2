import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configDialogOpen: false,
  transitionType: 'noTransition',
  transitionResource: 'none',
  isTransitionFull: true,
  config: {
    debugTransition: 'no',
    backgroundCapture: true,
    showTitle: 'no',
    fillSplitter: true,
    baseLineSize: 6,
    lineOpacity: 0.8,
    toolContainerType: 'twoColumn',
    homeImagePath: null,
    arrowShape: 'normal',
    showNextButton: true,
    googleEarthPrevPosition: { x: 0, y: 0 },
    googleEarthNextPosition: { x: 0, y: 0 },
  },
};

export const configSlice = createSlice({
  name: 'configSlice',
  initialState,
  reducers: {
    setConfigDialogOpen: (state, action) => {
      const { payload } = action;
      const { configDialogOpen } = payload;
      state.configDialogOpen = configDialogOpen;
    },
    setTransitionType: (state, action) => {
      const { payload } = action;
      const { transitionType } = payload;
      state.transitionType = transitionType;
    },
    setTransitionResource: (state, action) => {
      const { payload } = action;
      const { transitionResource } = payload;
      state.transitionResource = transitionResource;
    },
    setIsTransitionFull: (state, action) => {
      const { payload } = action;
      const { isTransitionFull } = payload;
      state.isTransitionFull = isTransitionFull;
    },
    setConfigValue: (state, action) => {
      const { payload } = action;
      const { key, value } = payload;
      state.config[key] = value;
    },
  },
})

export const {
  setTransitionType,
  setTransitionResource,
  setIsTransitionFull,
  setConfigDialogOpen,
  setConfigValue,
} = configSlice.actions;

export default configSlice.reducer;
