// @flow
import * as React from 'react';

type Props = {
  beatsPerMinute: number,
  increment: () => void,
  decrement: () => void,
  onChangeBpmInput: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onBlurBpmInput: () => void,
};

const BpmDisplay = ({
  beatsPerMinute,
  increment,
  decrement,
  onChangeBpmInput,
  onBlurBpmInput,
}: Props) => {
  return (
    <div>
      <button onClick={decrement}>-</button>

      <input
        type='text'
        value={beatsPerMinute}
        onChange={onChangeBpmInput}
        onBlur={onBlurBpmInput}
      />

      <button onClick={increment}>+</button>
    </div>
  );
};

export default BpmDisplay;
