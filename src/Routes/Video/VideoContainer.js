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
      loading: true,
      videos: [],
      videosLen: 0,
      id: this.props.match.params.id,
    };
  }

  async componentDidMount() {
    const {
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(this.state.id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    let video = null;
    try {
      if (isMovie) {
        ({
          data: result,
          data: {
            videos: { results: video },
          },
        } = await moviesApi.movieDetail(parsedId));
        this.setState({ videosLen: video.length });
      } else {
        ({
          data: result,
          data: {
            videos: { results: video },
          },
        } = await tvApi.showDetail(parsedId));
        this.setState({ videosLen: video.length });
      }
      this.setState({ result, video });
    } catch {
      this.setState({
        error: "Can't find Video information.",
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <>
        <VideoPresenter {...this.state}></VideoPresenter>
      </>
    );
  }
}

export default Video;
