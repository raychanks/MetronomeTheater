import React from 'react';
import Sound from 'react-sound';

import accentSound from 'Sound/accent_shorten.mp3';
import beatSound from 'Sound/beat_shorten.mp3';

soundManager.setup({ debugMode: false });

const SoundComponent = ({
  shouldPlayAccent,
  shouldPlayBeat,
}) => {
  const accentPlayStatus = shouldPlayAccent ? 'PLAYING' : 'STOPPED';
  const beatPlayStatus = shouldPlayBeat ? 'PLAYING' : 'STOPPED';

  return (
    <div>
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
    </div>
  );
};

export default SoundComponent;
