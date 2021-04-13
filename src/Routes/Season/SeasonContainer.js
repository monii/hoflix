import React from 'react';
import SeasonPresnter from './SeasonPresnter';
import { tvApi } from '../../api';

class Season extends React.Component {
  state = {
    season: [],
    error: null,
    loading: true,
    result: null,
    id: '',
  };

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    let season = [];
    try {
      ({
        data: result,
        data: { seasons: season },
      } = await tvApi.showDetail(parsedId));
      this.setState({ result, season });
    } catch {
      this.setState({
        error: "Can't find Season information.",
      });
    } finally {
      this.setState({ loading: false, id });
    }
  }

  render() {
    return (
      <>
        <SeasonPresnter {...this.state}></SeasonPresnter>
      </>
    );
  }
}

export default Season;
