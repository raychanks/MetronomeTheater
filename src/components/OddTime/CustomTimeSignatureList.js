// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import ButtonContainer from './ButtonContainer';
import {
  oddTimeBpmInput,
  oddTimeAccentInput,
  oddTimeDurationInput,
} from '../../actions/oddTime';

type Props = {
  oddTimeBpmInput: () => void,
  oddTimeAccentInput: () => void,
  oddTimeDurationInput: () => void,
  oddTimeItems: *,
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
        {_.map(this.props.oddTimeItems, item => {
          return (
            <Container key={item.id}>
              <BpmInput
                type='text'
                value={item.bpm}
                onChange={this.oddTimeInput('bpm', item.id)}
              />
              <AccentInput
                type='text'
                value={item.accentInterval}
                onChange={this.oddTimeInput('accent', item.id)}
              />
              <DurationInput
                type='text'
                value={item.duration}
                onChange={this.oddTimeInput('duration', item.id)}
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
  return { oddTimeItems: oddTime.oddTimeItems };
}

export default connect(mapStateToProps, {
  oddTimeBpmInput,
  oddTimeAccentInput,
  oddTimeDurationInput,
})(CustomTimeSignatureList);

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px 90px 90px 120px;
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
`;
