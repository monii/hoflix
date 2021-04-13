import React from 'react';
import ProductionPresnter from './ProductionPresnter';
import { moviesApi, tvApi } from '../../api';

class Production extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      countries: [],
      companies: [],
      error: null,
      isMovie: pathname.includes('/movie/'),
      loading: true,
      result: null,
      id: '',
    };
  }

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    let countries = [];
    let companies = [];
    try {
      if (isMovie) {
        ({
          data: result,
          data: { production_companies: companies },
          data: { production_countries: countries },
        } = await moviesApi.movieDetail(parsedId));
        this.setState({ result });
      } else {
        ({
          data: result,
          data: { production_companies: companies },
          data: { production_countries: countries },
        } = await tvApi.showDetail(parsedId));
        this.setState({ result });
      }
      this.setState({ companies, countries });
    } catch {
      this.setState({
        error: "Can't find Production information.",
      });
    } finally {
      this.setState({ loading: false, id });
    }
  }

  render() {
    return (
      <>
        <ProductionPresnter {...this.state}></ProductionPresnter>
      </>
    );
  }
}

export default Production;
