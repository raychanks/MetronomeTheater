// @flow
// type for action types
export type START_METRONOME_TYPE = 'START_METRONOME';
export type STOP_METRONOME_TYPE = 'STOP_METRONOME';
export type METRONOME_TICKS_TYPE = 'METRONOME_TICKS';
export type INCREMENT_BPM_TYPE = 'INCREMENT_BPM';
export type INCREMENT_ACCENT_INTERVAL_TYPE = 'INCREMENT_ACCENT_INTERVAL';
export type DECREMENT_BPM_TYPE = 'DECREMENT_BPM';
export type DECREMENT_ACCENT_INTERVAL_TYPE = 'DECREMENT_ACCENT_INTERVAL';
export type CHANGE_ACCENT_INTERVAL_TYPE = 'CHANGE_ACCENT_INTERVAL';
export type CHANGE_BPM_INPUT_TYPE = 'CHANGE_BPM_INPUT';
export type VALIDATE_BPM_INPUT_TYPE = 'VALIDATE_BPM_INPUT';
export type CHANGE_SPEED_FACTOR_TYPE = 'CHANGE_SPEED_FACTOR';
export type VALIDATE_SPEED_FACTOR_TYPE = 'VALIDATE_SPEED_FACTOR';

export type ODD_TIME_BPM_INPUT_TYPE = 'ODD_TIME_BPM_INPUT';
export type ODD_TIME_ACCENT_INPUT_TYPE = 'ODD_TIME_ACCENT_INPUT';
export type ODD_TIME_DURATION_INPUT_TYPE = 'ODD_TIME_DURATION_INPUT';
export type ADD_ODD_TIME_ITEM_TYPE = 'ADD_ODD_TIME_ITEM';
export type REMOVE_ODD_TIME_ITEM_TYPE = 'REMOVE_ODD_TIME_ITEM';
export type START_ODD_TIME_METRONOME_TYPE = 'START_ODD_TIME_METRONOME';
export type STOP_ODD_TIME_METRONOME_TYPE = 'STOP_ODD_TIME_METRONOME';
export type ODD_TIME_METRONOME_TICKS_TYPE = 'ODD_TIME_METRONOME_TICKS';
export type CHANGE_ODD_TIME_SPEED_FACTOR_TYPE = 'CHANGE_ODD_TIME_SPEED_FACTOR';
export type VALIDATE_ODD_TIME_SPEED_FACTOR_TYPE = 'VALIDATE_ODD_TIME_SPEED_FACTOR';
export type VALIDATE_ODD_TIME_BPM_INPUT_TYPE = 'VALIDATE_ODD_TIME_BPM_INPUT';
export type LOAD_ODD_TIME_TEMPLATE_TYPE = 'LOAD_ODD_TIME_TEMPLATE';

// type for actions
// metronome
export type StartMetronomeAction = {
  type: START_METRONOME_TYPE,
  intervalId: ?IntervalID
};
export type StopMetronomeAction = {
  type: STOP_METRONOME_TYPE
};
export type MetronomeTicksAction = {
  type: METRONOME_TICKS_TYPE
};
export type IncrementBpmAction = {
  type: INCREMENT_BPM_TYPE
};
export type IncrementAccentIntervalAction = {
  type: INCREMENT_ACCENT_INTERVAL_TYPE
};
export type DecrementBpmAction = {
  type: DECREMENT_BPM_TYPE
};
export type DecrementAccentIntervalAction = {
  type: DECREMENT_ACCENT_INTERVAL_TYPE
};
export type ChangeAccentIntervalAction = {
  type: CHANGE_ACCENT_INTERVAL_TYPE,
  value: number
};
export type ChangeBpmInputAction = {
  type: CHANGE_BPM_INPUT_TYPE,
  value: number
};
export type ValidateBpmInputAction = {
  type: VALIDATE_BPM_INPUT_TYPE,
  beatsPerMinute: number
};
export type ChangeSpeedFactorAction = {
  type: CHANGE_SPEED_FACTOR_TYPE,
  speedFactor: number
};
export type ValidateSpeedFactorAction = {
  type: VALIDATE_SPEED_FACTOR_TYPE,
  speedFactor: number
};
export type MetronomeAction =
  | StartMetronomeAction
  | StopMetronomeAction
  | MetronomeTicksAction
  | IncrementBpmAction
  | IncrementAccentIntervalAction
  | DecrementBpmAction
  | DecrementAccentIntervalAction
  | ChangeAccentIntervalAction
  | ChangeBpmInputAction
  | ValidateBpmInputAction
  | ChangeSpeedFactorAction
  | ValidateSpeedFactorAction;

// oddTime Action
export type OddTimeBpmInputAction = {
  type: ODD_TIME_BPM_INPUT_TYPE,
  id: number,
  value: number
};
export type OddTimeAccentInputAction = {
  type: ODD_TIME_ACCENT_INPUT_TYPE,
  id: number,
  value: number
};
export type OddTimeDurationInputAction = {
  type: ODD_TIME_DURATION_INPUT_TYPE,
  id: number,
  value: number
};
export type AddOddTimeItemAction = {
  type: ADD_ODD_TIME_ITEM_TYPE
};
export type RemoveOddTimeItemAction = {
  type: REMOVE_ODD_TIME_ITEM_TYPE,
  id: number
};
export type StartOddTimeMetronomeAction = {
  type: START_ODD_TIME_METRONOME_TYPE
};
export type StopOddTimeMetronomeAction = {
  type: STOP_ODD_TIME_METRONOME_TYPE
};
export type OddTimeMetronomeTicksAction = {
  type: ODD_TIME_METRONOME_TICKS_TYPE,
  currentId: number,
  counter: number
};
export type ChangeOddTimeSpeedFactorAction = {
  type: CHANGE_ODD_TIME_SPEED_FACTOR_TYPE,
  value: number
};
export type ValidateOddTimeSpeedFactorAction = {
  type: VALIDATE_ODD_TIME_SPEED_FACTOR_TYPE,
  value: number
};
export type ValidateOddTimeBpmInputAction = {
  type: VALIDATE_ODD_TIME_BPM_INPUT_TYPE,
  bpm: number,
  id: number,
};
export type LoadOddTimeTemplateAction = {
  type: LOAD_ODD_TIME_TEMPLATE_TYPE,
  oddTimeTemplate: mixed,
};
export type OddTimeAction =
  | OddTimeBpmInputAction
  | OddTimeAccentInputAction
  | OddTimeDurationInputAction
  | AddOddTimeItemAction
  | RemoveOddTimeItemAction
  | StartOddTimeMetronomeAction
  | StopOddTimeMetronomeAction
  | OddTimeMetronomeTicksAction
  | ChangeOddTimeSpeedFactorAction
  | ValidateOddTimeSpeedFactorAction
  | ValidateOddTimeBpmInputAction
  | LoadOddTimeTemplateAction;

// State
export type MetronomeState = {
  +intervalId: ?IntervalID,
  +beatsPerMinute: number,
  +counter: number,
  +isPlaying: boolean,
  +accentInterval: number,
  +speedFactor: number,
};

export type OddTimeState = {
  +nextId: number,
  +currentId: number,
  +counter: number,
  +intervalId: ?IntervalID,
  +isPlaying: boolean,
  +speedFactor: number,
  +oddTimeItems: {
    +[oddTimeItem_id: number | string]: {
      +id: number,
      +bpm: number,
      +accentInterval: number,
      +duration: number,
    },
  },
};

export type State = {
  metronome: MetronomeState,
  oddTime: OddTimeState,
};
