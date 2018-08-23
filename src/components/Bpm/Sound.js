import React from 'react';
import Sound from 'react-sound';

import accentSound from 'Sound/accent.mp3';
import beatSound from 'Sound/beat.mp3';

soundManager.setup({ debugMode: false });

const SoundComponent = ({
  shouldPlayAccent,
  shouldPlayBeat,
}) => {
  const accentPlayStatus = shouldPlayAccent ? 'PLAYING' : 'STOPPED';
  const beatPlayStatus = shouldPlayBeat ? 'PLAYING' : 'STOPPED';

  return (
    <React.Fragment>
      <Sound
        url={accentSound}
        playStatus={accentPlayStatus}
        autoLoad={true}
      />
      <Sound
        url={beatSound}
        playStatus={beatPlayStatus}
        autoLoad={true}
      />
    </React.Fragment>
  );
};

export default SoundComponent;
