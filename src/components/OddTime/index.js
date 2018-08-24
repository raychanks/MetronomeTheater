// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CustomTimeSignatureList from './CustomTimeSignatureList';
import SoundComponent from '../Bpm/Sound';
import StartButton from './StartButton';
import {
  addOddTimeItem,
  toggleOddTimePlayState,
  changeSpeedFactor,
  validateSpeedFactor,
  saveTemplate,
  loadTemplate,
} from '../../actions/oddTime';

type Props = {
  addOddTimeItem: () => mixed,
  toggleOddTimePlayState: () => *,
  changeSpeedFactor: () => mixed,
  validateSpeedFactor: () => mixed,
  oddTime: *,
};

class OddTime extends React.Component<Props> {
  render() {
    const {
      isPlaying,
      counter,
      currentId,
      oddTimeItems,
      speedFactor,
    } = this.props.oddTime;
    const accentInterval = oddTimeItems[currentId]
      ? oddTimeItems[currentId].accentInterval
      : 1;
    const playBeat = isPlaying && counter % accentInterval !== 0;
    const playAccent = isPlaying && counter % accentInterval === 0;

    return (
      <Container>
        <ButtonSection>
          <StartButton
            isPlaying={isPlaying}
            togglePlayState={this.props.toggleOddTimePlayState}
          />

          <div>
            <HeaderText>Speed Factor</HeaderText>
            <HeaderText>(30% - 150%)</HeaderText>
            <NumberInput
              type='number'
              value={speedFactor}
              disabled={isPlaying}
              onChange={this.props.changeSpeedFactor}
              onBlur={this.props.validateSpeedFactor}
            />
          </div>
        </ButtonSection>

        <StorageButtonContainer>
          <StorageButton
            onClick={!isPlaying ? this.props.saveTemplate : null}
          >
            Save Template
          </StorageButton>
          <StorageButton
            onClick={!isPlaying ? this.props.loadTemplate : null}
          >
            Load Template
          </StorageButton>
        </StorageButtonContainer>

        <Header>
          <HeaderText>BPM</HeaderText>
          <HeaderText>Accent Interval</HeaderText>
          <HeaderText>No. of measures</HeaderText>
          <Button
            onClick={!isPlaying ? this.props.addOddTimeItem : null}
          >
            +
          </Button>
        </Header>

        <CustomTimeSignatureList />

        <SoundComponent
          shouldPlayAccent={playAccent}
          shouldPlayBeat={playBeat}
          counter={counter}
        />
      </Container>
    );
  }
}

function mapStateToProps({ oddTime }) {
  return { oddTime };
}

export default connect(mapStateToProps, {
  addOddTimeItem,
  toggleOddTimePlayState,
  changeSpeedFactor,
  validateSpeedFactor,
  saveTemplate,
  loadTemplate,
})(OddTime);

const Container = styled.div`
  display: grid;
  row-gap: 15px;
  grid-template-rows: 200px;
  grid-area: timer;
  align-self: start;
  justify-items: center;
`;

const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: 200px 150px;
  column-gap: 20px;
  align-items: center;
  height: 200px;
`;

const NumberInput = styled.input`
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  margin: 5px 25px;
  border: 1px solid steelblue;
  border-radius: 2px;
  text-align: center;
  font-size: 1.2em;
  color: steelblue;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 90px 90px 90px 40px;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const HeaderText = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  color: steelblue;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  margin: 5px;
  border: none;
  border-radius: 50%;
  background: none;
  font-size: 1.2em;
  cursor: pointer;
  outline: none;
  color: steelblue;
  user-select: none;

  :hover {
    background: #ddd;
  };
`;

const StorageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StorageButton = styled.button`
  height: 40px;
  width: 120px;
  background: #DCEDC8;
  border: 2px solid #C5E1A5;
  border-radius: 4px;
  margin: 0 20px;
  cursor: pointer;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  outline: none;
  color: #333;

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    background: #9CCC65;
    border: 2px solid #8BC34A;
  };
`;
