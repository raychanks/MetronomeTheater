import oddTimeReducer from '../../reducers/oddTime';
import { expect } from 'chai';

import {
  ODD_TIME_BPM_INPUT,
  ODD_TIME_ACCENT_INPUT,
  ODD_TIME_DURATION_INPUT,
  ADD_ODD_TIME_ITEM,
  REMOVE_ODD_TIME_ITEM,
  START_ODD_TIME_METRONOME,
  STOP_ODD_TIME_METRONOME,
  ODD_TIME_METRONOME_TICKS,
  CHANGE_ODD_TIME_SPEED_FACTOR,
  VALIDATE_ODD_TIME_SPEED_FACTOR,
  VALIDATE_ODD_TIME_BPM_INPUT,
  LOAD_ODD_TIME_TEMPLATE,
} from '../../constants/actionTypes';

const INITIAL_STATE = {
  oddTimeItems: {
    '1': {
      id: 1,
      bpm: 240,
      accentInterval: 3,
      duration: 2,
    },
    '2': {
      id: 2,
      bpm: 90,
      accentInterval: 2,
      duration: 3,
    },
  },
  nextId: 3,
  currentId: 1,
  counter: 0,
  intervalId: null,
  isPlaying: false,
  speedFactor: 100,
};

const INITIAL_STATE_CLONE = {
  oddTimeItems: {
    '1': {
      id: 1,
      bpm: 240,
      accentInterval: 3,
      duration: 2,
    },
    '2': {
      id: 2,
      bpm: 90,
      accentInterval: 2,
      duration: 3,
    },
  },
  nextId: 3,
  currentId: 1,
  counter: 0,
  intervalId: null,
  isPlaying: false,
  speedFactor: 100,
};

const INITIAL_STATE_2 = {
  oddTimeItems: {
    '5': {
      id: 5,
      bpm: 190,
      accentInterval: 1,
      duration: 3,
    },
  },
  nextId: 6,
  currentId: 1,
  counter: 0,
  intervalId: null,
  isPlaying: false,
  speedFactor: 100,
};

describe('oddTimeReducer', function () {
  it('START_ODD_TIME_METRONOME', function () {
    const action = { type: START_ODD_TIME_METRONOME };
    const newState = oddTimeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: true,
      speedFactor: 100,
    });
  });

  it('STOP_ODD_TIME_METRONOME', function () {
    const action = { type: STOP_ODD_TIME_METRONOME };
    const INITIAL_STATE_3 = {
      oddTimeItems: {},
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE_2, action);
    const newState3 = oddTimeReducer(INITIAL_STATE_3, action);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
    expect(newState2).to.eql({
      oddTimeItems: {
        '5': {
          id: 5,
          bpm: 190,
          accentInterval: 1,
          duration: 3,
        },
      },
      nextId: 6,
      currentId: 5,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
    expect(newState3).to.eql({
      oddTimeItems: {},
      nextId: 3,
      currentId: 0,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('ODD_TIME_METRONOME_TICKS', function () {
    const action = {
      type: ODD_TIME_METRONOME_TICKS,
      currentId: 5,
      counter: 12,
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 5,
      counter: 12,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('ODD_TIME_BPM_INPUT', function () {
    const action = {
      type: ODD_TIME_BPM_INPUT,
      value: 150,
      id: 2,
    };
    const action2 = {
      type: ODD_TIME_BPM_INPUT,
      value: 'z150',
      id: 2,
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 150,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
    expect(newState2).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('VALIDATE_ODD_TIME_BPM_INPUT', function () {
    const action = {
      type: VALIDATE_ODD_TIME_BPM_INPUT,
      bpm: 134,
      id: 1,
    };
    const action2 = {
      type: VALIDATE_ODD_TIME_BPM_INPUT,
      bpm: 13,
      id: 2,
    };
    const action3 = {
      type: VALIDATE_ODD_TIME_BPM_INPUT,
      bpm: 734,
      id: 1,
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);
    const newState3 = oddTimeReducer(INITIAL_STATE, action3);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 134,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
    expect(newState2).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 20,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
    expect(newState3).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 440,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('ODD_TIME_ACCENT_INPUT', function () {
    const action = {
      type: ODD_TIME_ACCENT_INPUT,
      value: 'abc',
      id: 1
    };
    const action2 = {
      type: ODD_TIME_ACCENT_INPUT,
      value: 32,
      id: 1
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql(INITIAL_STATE_CLONE);
    expect(newState2).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 32,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('ODD_TIME_DURATION_INPUT', function () {
    const action = {
      type: ODD_TIME_DURATION_INPUT,
      value: 'abc',
      id: 1
    };
    const action2 = {
      type: ODD_TIME_DURATION_INPUT,
      value: 32,
      id: 1
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql(INITIAL_STATE_CLONE);
    expect(newState2).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 32,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('ADD_ODD_TIME_ITEM', function () {
    const action = { type: ADD_ODD_TIME_ITEM };
    const newState = oddTimeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
        '3': {
          id: 3,
          bpm: 90,
          accentInterval: 4,
          duration: 4,
        },
      },
      nextId: 4,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('REMOVE_ODD_TIME_ITEM', function () {
    const action = {
      type: REMOVE_ODD_TIME_ITEM,
      id: 2,
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
  });

  it('CHANGE_ODD_TIME_SPEED_FACTOR', function () {
    const action = {
      type: CHANGE_ODD_TIME_SPEED_FACTOR,
      value: 80,
    };
    const action2 = {
      type: CHANGE_ODD_TIME_SPEED_FACTOR,
      value: 'geg80',
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 80,
    });
    expect(newState2).to.eql(INITIAL_STATE_CLONE);
  });

  it('VALIDATE_ODD_TIME_SPEED_FACTOR', function () {
    const action = {
      type: VALIDATE_ODD_TIME_SPEED_FACTOR,
      value: 2,
    };
    const action2 = {
      type: VALIDATE_ODD_TIME_SPEED_FACTOR,
      value: 222,
    };
    const action3 = {
      type: VALIDATE_ODD_TIME_SPEED_FACTOR,
      value: 133,
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);
    const newState3 = oddTimeReducer(INITIAL_STATE, action3);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState3).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 30,
    });
    expect(newState2).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
        '2': {
          id: 2,
          bpm: 90,
          accentInterval: 2,
          duration: 3,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 150,
    });
  });

  it('LOAD_ODD_TIME_TEMPLATE', function () {
    const action = {
      type: LOAD_ODD_TIME_TEMPLATE,
      oddTimeTemplate: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
      }
    };
    const action2 = {
      type: LOAD_ODD_TIME_TEMPLATE,
      oddTimeTemplate: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
          tooMuch: 'nope',
        },
      }
    };
    const action3 = {
      type: LOAD_ODD_TIME_TEMPLATE,
      oddTimeTemplate: {
        '1': {
          id: 1,
          bpm: 'altered',
          accentInterval: 3,
          duration: 2,
        },
      }
    };
    const newState = oddTimeReducer(INITIAL_STATE, action);
    const newState2 = oddTimeReducer(INITIAL_STATE, action2);
    const newState3 = oddTimeReducer(INITIAL_STATE, action3);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql({
      oddTimeItems: {
        '1': {
          id: 1,
          bpm: 240,
          accentInterval: 3,
          duration: 2,
        },
      },
      nextId: 3,
      currentId: 1,
      counter: 0,
      intervalId: null,
      isPlaying: false,
      speedFactor: 100,
    });
    expect(newState2).to.eql(INITIAL_STATE_CLONE);
    expect(newState3).to.eql(INITIAL_STATE_CLONE);
  });

  it('DEFAULT', function () {
    const action = { type: 'someUnknownActionTypes' };
    const newState = oddTimeReducer(INITIAL_STATE, action);

    expect(INITIAL_STATE).to.eql(INITIAL_STATE_CLONE);
    expect(newState).to.eql(INITIAL_STATE_CLONE);
  });
});
