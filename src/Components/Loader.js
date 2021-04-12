import react from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export default class App extends react.Component {
  render() {
    const LoaderDiv = styled.div`
      position: absolute;
      left: 50%;
      top: 30%;
    `;
    return (
      <LoaderDiv>
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      </LoaderDiv>
    );
  }
}
