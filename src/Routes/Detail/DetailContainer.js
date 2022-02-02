import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

const Detail = (props) => {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
  } = props;
  const state = {
    result: null,
    error: null,
    loading: true,
    isMovie: pathname.includes("/movie/"),
    id: id,
  };
  const [values, setValues] = useImmer(state);

  useEffect(() => {
    const isMovie = values.isMovie;
    const parsedId = parseInt(values.id);
    if (isNaN(parsedId)) {
      return props.history.push("/");
    }
    let result = null;
    const getDates = async () => {
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.movieDetail(parsedId));
        } else {
          ({ data: result } = await tvApi.showDetail(parsedId));
        }
      } catch {
        setValues((draft) => {
          draft.error = "Can't find anything.";
        });
      } finally {
        setValues((draft) => {
          draft.loading = false;
          draft.result = result;
        });
      }
    };
    getDates();
  }, []);

  return (
    <>
      <DetailPresenter {...values} />
    </>
  );
};

export default Detail;
