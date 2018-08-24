import metronomeReducer from '../../reducers/metronome';
import { expect } from 'chai';
import {
  START_METRONOME,
  STOP_METRONOME,
  METRONOME_TICKS,
  INCREMENT_BPM,
  INCREMENT_ACCENT_INTERVAL,
  DECREMENT_BPM,
  DECREMENT_ACCENT_INTERVAL,
  CHANGE_ACCENT_INTERVAL,
  CHANGE_BPM_INPUT,
  VALIDATE_BPM_INPUT,
  CHANGE_SPEED_FACTOR,
  VALIDATE_SPEED_FACTOR,
} from '../../constants/actionTypes';

const INITIAL_STATE = {
  intervalId: null,
  beatsPerMinute: 90,
  counter: 0,
  isPlaying: false,
  accentInterval: 4,
  speedFactor: 100,
};

describe('metornomeReducer', function () {
  it('START_METRONOME', function () {
    const action = { type: START_METRONOME, intervalId: 123 };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: 123,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: true,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('STOP_METRONOME', function () {
    const action = { type: STOP_METRONOME };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('METRONOME_TICKS', function () {
    const action = { type: METRONOME_TICKS };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 1,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('INCREMENT_BPM', function () {
    const action = { type: INCREMENT_BPM };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 91,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('INCREMENT_ACCENT_INTERVAL', function () {
    const action = { type: INCREMENT_ACCENT_INTERVAL };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 5,
      speedFactor: 100,
    });
  });

  it('DECREMENT_BPM', function () {
    const action = { type: DECREMENT_BPM };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 89,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('DECREMENT_ACCENT_INTERVAL', function () {
    const action = { type: DECREMENT_ACCENT_INTERVAL };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 3,
      speedFactor: 100,
    });
  });

  it('CHANGE_ACCENT_INTERVAL', function () {
    const action = { type: CHANGE_ACCENT_INTERVAL, value: 50 };
    const action2 = { type: CHANGE_ACCENT_INTERVAL, value: 5.3 };
    const action3 = { type: CHANGE_ACCENT_INTERVAL, value: 'a' };
    const newState = metronomeReducer(INITIAL_STATE, action);
    const newState2 = metronomeReducer(INITIAL_STATE, action2);
    const newState3 = metronomeReducer(INITIAL_STATE, action3);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 50,
      speedFactor: 100,
    });
    expect(newState2).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 0,
      speedFactor: 100,
    });
    expect(newState3).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 0,
      speedFactor: 100,
    });
  });

  it('CHANGE_BPM_INPUT', function () {
    const action = { type: CHANGE_BPM_INPUT, value: 127 };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 127,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('VALIDATE_BPM_INPUT', function () {
    const action = { type: VALIDATE_BPM_INPUT, beatsPerMinute: 58 };
    const action2 = { type: VALIDATE_BPM_INPUT, beatsPerMinute: 12 };
    const action3 = { type: VALIDATE_BPM_INPUT, beatsPerMinute: 999 };
    const action4 = { type: VALIDATE_BPM_INPUT, beatsPerMinute: 'abcd' };
    const newState = metronomeReducer(INITIAL_STATE, action);
    const newState2 = metronomeReducer(INITIAL_STATE, action2);
    const newState3 = metronomeReducer(INITIAL_STATE, action3);
    const newState4 = metronomeReducer(INITIAL_STATE, action4);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState2).to.eql({
      intervalId: null,
      beatsPerMinute: 20,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState3).to.eql({
      intervalId: null,
      beatsPerMinute: 440,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState4).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('CHANGE_SPEED_FACTOR', function () {
    const action = { type: CHANGE_SPEED_FACTOR, speedFactor: 127 };
    const action2 = { type: CHANGE_SPEED_FACTOR, speedFactor: 67.2 };
    const action3 = { type: CHANGE_SPEED_FACTOR, speedFactor: 's127.2' };
    const newState = metronomeReducer(INITIAL_STATE, action);
    const newState2 = metronomeReducer(INITIAL_STATE, action2);
    const newState3 = metronomeReducer(INITIAL_STATE, action3);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 127,
    });
    expect(newState2).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 67.2,
    });
    expect(newState3).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('VALIDATE_SPEED_FACTOR', function () {
    const action = { type: VALIDATE_SPEED_FACTOR, speedFactor: 10 };
    const action2 = { type: VALIDATE_SPEED_FACTOR, speedFactor: 200 };
    const action3 = { type: VALIDATE_SPEED_FACTOR, speedFactor: 66 };
    const newState = metronomeReducer(INITIAL_STATE, action);
    const newState2 = metronomeReducer(INITIAL_STATE, action2);
    const newState3 = metronomeReducer(INITIAL_STATE, action3);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 30,
    });
    expect(newState2).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 150,
    });
    expect(newState3).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });

  it('DEFAULT', function () {
    const action = { type: 'some_unknown_random_type' };
    const newState = metronomeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
    expect(newState).to.eql({
      intervalId: null,
      beatsPerMinute: 90,
      counter: 0,
      isPlaying: false,
      accentInterval: 4,
      speedFactor: 100,
    });
  });
});
