import {defaultStyles, defaultTitle} from '@/constans';

const defaultState = {
  date: new Date().toJSON(),
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  appTitle: defaultTitle,
  currentStyles: defaultStyles,
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const normalizeInitState = (state) => {
  return state ? normalize(state) : defaultState;
};