import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";
import { useImmer } from "use-immer";

const Search = () => {
  const state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null,
  };
  const [values, setValues] = useImmer(state);

  const searchByTerm = async () => {
    const searchTerm = values.searchTerm;
    setValues((draft) => {
      draft.loading = true;
    });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setValues((draft) => {
        draft.movieResults = movieResults;
        draft.tvResults = tvResults;
      });
    } catch {
      setValues((draft) => {
        draft.error = "Can't find results.";
      });
    } finally {
      setValues((draft) => {
        draft.loading = false;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setValues((draft) => {
      draft.searchTerm = value;
    });
  };

  return (
    <SearchPresenter
      movieResults={values.movieResults}
      tvResults={values.tvResults}
      loading={values.loading}
      error={values.error}
      searchTerm={values.searchTerm}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  );
};

export default Search;
