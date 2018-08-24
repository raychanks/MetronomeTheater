// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import map from 'lodash/map';

import ButtonContainer from './ButtonContainer';
import {
  oddTimeBpmInput,
  oddTimeAccentInput,
  oddTimeDurationInput,
  validateBpmInput,
} from '../../actions/oddTime';

type Props = {
  oddTimeBpmInput: (id: number, value: number) => void,
  oddTimeAccentInput: (id: number, value: number) => void,
  oddTimeDurationInput: (id: number, value: number) => void,
  validateBpmInput: (id: number, bpm: number) => mixed,
  oddTimeItems: *,
  currentId: number,
  speedFactor: number,
  isPlaying: boolean,
};

class CustomTimeSignatureList extends React.Component<Props> {
  oddTimeInput = (name, id) => event => {
    const value = Number(event.currentTarget.value);

    if (name === 'bpm') {
      this.props.oddTimeBpmInput(id, value);
    } else if (name === 'accent') {
      this.props.oddTimeAccentInput(id, value);
    } else {
      this.props.oddTimeDurationInput(id, value);
    }
  }

  validateBpmInputWrapper = id => event => {
    const bpm = Number(event.currentTarget.value);

    this.props.validateBpmInput(id, bpm);
  }

  render() {
    const { oddTimeItems, currentId, isPlaying, speedFactor } = this.props;

    return (
      <div>
        {map(oddTimeItems, item => {
          return (
            <Container key={item.id}>
              <BpmInput
                type='text'
                value={Math.round(item.bpm * speedFactor / 100)}
                onChange={this.oddTimeInput('bpm', item.id)}
                onBlur={this.validateBpmInputWrapper(item.id)}
                active={currentId === item.id && isPlaying}
              />
              <AccentInput
                type='text'
                value={item.accentInterval}
                onChange={this.oddTimeInput('accent', item.id)}
                active={currentId === item.id && isPlaying}
              />
              <DurationInput
                type='text'
                value={item.duration}
                onChange={this.oddTimeInput('duration', item.id)}
                active={currentId === item.id && isPlaying}
              />
              <ButtonContainer id={item.id} />
            </Container>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ oddTime }) {
  const {
    oddTimeItems,
    currentId,
    isPlaying,
    speedFactor,
  } = oddTime;

  return {
    oddTimeItems,
    currentId,
    isPlaying,
    speedFactor,
  };
}

export default connect(mapStateToProps, {
  oddTimeBpmInput,
  oddTimeAccentInput,
  oddTimeDurationInput,
  validateBpmInput,
})(CustomTimeSignatureList);

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px 90px 90px 40px;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const BpmInput = styled.input`
  box-sizing: border-box;
  width: 90px;
  height: 30px;
  margin: 5px 0;
  border: 1px solid steelblue;
  border-radius: 2px;
  text-align: center;
  font-size: 1.2em;
  color: steelblue;

  ${props => props.active ? 'background: rgb(235, 235, 228);' : null}
`;

const AccentInput = styled.input`
  box-sizing: border-box;
  width: 90px;
  height: 30px;
  margin: 5px 0;
  border: 1px solid steelblue;
  border-radius: 2px;
  text-align: center;
  font-size: 1.2em;
  color: steelblue;

  ${props => props.active ? 'background: rgb(235, 235, 228);' : null}
`;

const DurationInput = styled.input`
  box-sizing: border-box;
  width: 90px;
  height: 30px;
  margin: 5px 0;
  border: 1px solid steelblue;
  border-radius: 2px;
  text-align: center;
  font-size: 1.2em;
  color: steelblue;

  ${props => props.active ? 'background: rgb(235, 235, 228);' : null}
`;
