import React, { useEffect, useCallback } from "react";
import { useImmer } from "use-immer";
import ProductionPresnter from "./ProductionPresnter";
import { moviesApi, tvApi } from "../../api";

const Production = (props) => {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
    history: { push },
  } = props;
  const state = {
    countries: [],
    companies: [],
    error: null,
    isMovie: pathname.includes("/movie/"),
    loading: true,
    result: null,
    id: "",
  };
  const [values, setValues] = useImmer(state);

  const getDatas = useCallback(async () => {
    const isMovie = values.isMovie;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
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
        setValues((draft) => {
          draft.result = result;
        });
      } else {
        ({
          data: result,
          data: { production_companies: companies },
          data: { production_countries: countries },
        } = await tvApi.showDetail(parsedId));
        setValues((draft) => {
          draft.result = result;
        });
      }
      setValues((draft) => {
        draft.companies = companies;
        draft.countries = countries;
      });
    } catch {
      setValues((draft) => {
        draft.error = "Can't find Production information.";
      });
    } finally {
      setValues((draft) => {
        draft.loading = false;
        draft.id = id;
      });
    }
  }, [id, push, setValues, values.isMovie]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  return (
    <>
      <ProductionPresnter {...values}></ProductionPresnter>
    </>
  );
};

export default Production;
