// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { removeOddTimeItem } from '../../actions/oddTime';

type Props = {
  id: number,
  removeOddTimeItem: (id: number) => mixed,
};

class ButtonContainer extends React.Component<Props> {
  removeOddTimeItemWrapper = id => () => {
    this.props.removeOddTimeItem(id);
  }

  render() {
    return (
      <Container>
        <Button onClick={this.removeOddTimeItemWrapper(this.props.id)}>
          x
        </Button>
        {/* <Button> */}
        {/*   U */}
        {/* </Button> */}
        {/* <Button> */}
        {/*   D */}
        {/* </Button> */}
      </Container>
    );
  }
}

export default connect(null, { removeOddTimeItem })(ButtonContainer);

const Container = styled.div`
  /*width: 120px;*/
  width: 40px;
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
