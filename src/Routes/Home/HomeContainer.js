import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

const Home = () => {
  const state = {
    nowPlaying: [],
    upcoming: [],
    popular: [],
    loading: false,
    error: "",
  };

  const [values, setValues] = useImmer(state);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        setValues((draft) => {
          draft.nowPlaying = nowPlaying;
          draft.upcoming = upcoming;
          draft.popular = popular;
        });
      } catch {
        setValues((draft) => {
          draft.error = "Can't find movie information.";
        });
      } finally {
        setValues((draft) => {
          draft.loading = false;
        });
      }
    };
    getDatas();
  }, [setValues]);

  return (
    <HomePresenter
      nowPlaying={values.nowPlaying}
      upcoming={values.upcoming}
      popular={values.popular}
      error={values.error}
      loading={values.loading}
    />
  );
};

export default Home;
