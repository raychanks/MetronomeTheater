import { combineReducers } from 'redux';

import metronomeReducer from './metronome';

export default combineReducers({
  metronome: metronomeReducer,
});
