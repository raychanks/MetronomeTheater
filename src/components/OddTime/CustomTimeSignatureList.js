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
} from '../../actions/oddTime';

type Props = {
  oddTimeBpmInput: (id: number, value: number) => void,
  oddTimeAccentInput: (id: number, value: number) => void,
  oddTimeDurationInput: (id: number, value: number) => void,
  oddTimeItems: *,
  currentId: number,
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

  render() {
    return (
      <div>
        {map(this.props.oddTimeItems, item => {
          return (
            <Container key={item.id}>
              <BpmInput
                type='text'
                value={item.bpm}
                onChange={this.oddTimeInput('bpm', item.id)}
                active={this.props.currentId === item.id && this.props.isPlaying}
              />
              <AccentInput
                type='text'
                value={item.accentInterval}
                onChange={this.oddTimeInput('accent', item.id)}
                active={this.props.currentId === item.id && this.props.isPlaying}
              />
              <DurationInput
                type='text'
                value={item.duration}
                onChange={this.oddTimeInput('duration', item.id)}
                active={this.props.currentId === item.id && this.props.isPlaying}
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
  return {
    oddTimeItems: oddTime.oddTimeItems,
    currentId: oddTime.currentId,
    isPlaying: oddTime.isPlaying,
  };
}

export default connect(mapStateToProps, {
  oddTimeBpmInput,
  oddTimeAccentInput,
  oddTimeDurationInput,
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

  ${props => props.active ? 'background: powderblue;' : null}
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

  ${props => props.active ? 'background: powderblue;' : null}
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

  ${props => props.active ? 'background: powderblue;' : null}
`;
