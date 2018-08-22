// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CustomTimeSignatureList from './CustomTimeSignatureList';
import { toggleOddTime, addOddTimeItem } from '../../actions/oddTime';

type Props = {
  toggleOddTime: () => mixed,
  addOddTimeItem: () => mixed,
};

const OddTime = (props: Props) => {
  return (
    <Container>
      <div>
        <OddTimeCheckBox
          id='odd-time-checkbox'
          type='checkbox'
          checked={props.isOddTimeEnabled}
          onChange={props.toggleOddTime}
        />
        <OddTimeCheckBoxLabel htmlFor='odd-time-checkbox'>
          Use metronome in odd time mode
        </OddTimeCheckBoxLabel>
      </div>

      <Header>
        <HeaderText>BPM</HeaderText>
        <HeaderText>Accent Interval</HeaderText>
        <HeaderText>No. of measures</HeaderText>
        <Button onClick={props.addOddTimeItem}>
          +
        </Button>
      </Header>

      <CustomTimeSignatureList />
    </Container>
  );
};

function mapStateToProps({ oddTime }) {
  return { isOddTimeEnabled: oddTime.isOddTimeEnabled };
}

export default connect(mapStateToProps, {
  toggleOddTime,
  addOddTimeItem,
})(OddTime);

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  grid-auto-rows: 40px;
  grid-area: odd;
  align-self: start;
`;

const OddTimeCheckBoxLabel = styled.label`

`;

const OddTimeCheckBox = styled.input`
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

  :hover {
    background: #ddd;
  };
`;
