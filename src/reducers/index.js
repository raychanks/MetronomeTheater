import { combineReducers } from 'redux';

import metronomeReducer from './metronome';
import oddTimeReducer from './oddTime';

export default combineReducers({
  metronome: metronomeReducer,
  oddTime: oddTimeReducer,
});
