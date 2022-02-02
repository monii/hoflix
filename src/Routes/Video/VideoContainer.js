import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import VideoPresenter from "./VideoPresenter";
import { moviesApi, tvApi } from "../../api";

const Video = (props) => {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
  } = props;
  const state = {
    result: null,
    error: null,
    isMovie: pathname.includes("/movie/"),
    loading: true,
    videos: [],
    videosLen: 0,
    id: id,
  };
  const [values, setValues] = useImmer(state);

  useEffect(() => {
    const getDates = async () => {
      const {
        history: { push },
      } = props;
      const isMovie = values.isMovie;
      const parsedId = parseInt(values.id);
      if (isNaN(parsedId)) {
        return push("/");
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
          setValues((draft) => {
            draft.videosLen = video.length;
          });
        } else {
          ({
            data: result,
            data: {
              videos: { results: video },
            },
          } = await tvApi.showDetail(parsedId));
          setValues((draft) => {
            draft.videosLen = video.length;
          });
        }
        setValues((draft) => {
          draft.result = result;
          draft.video = video;
        });
      } catch {
        setValues((draft) => {
          draft.error = "Can't find Video information.";
        });
      } finally {
        setValues((draft) => {
          draft.loading = false;
        });
      }
    };
    getDates();
  }, []);

  return (
    <>
      <VideoPresenter {...values}></VideoPresenter>
    </>
  );
};

export default Video;
