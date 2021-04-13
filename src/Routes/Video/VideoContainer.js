import React from 'react';
import VideoPresenter from './VideoPresenter';
import { moviesApi, tvApi } from '../../api';

class Video extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    console.log(isMovie);
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    try {
      if (isMovie) {
        const {
          data: {
            videos: { results: result },
          },
        } = await moviesApi.movieDetail(parsedId);
      } else {
        const {
          data: {
            videos: { results: result },
          },
        } = await moviesApi.movieDetail(parsedId);
      }
    } catch {
      this.setState({
        error: "Can't find TV information.",
      });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { topRated, popular, airingToday, loading, error } = this.state;
    return (
      <>
        <VideoPresenter></VideoPresenter>
      </>
    );
  }
}

export default Video;
