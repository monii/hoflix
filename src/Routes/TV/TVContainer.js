import React, { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

const TV = () => {
  const state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  };
  const [values, setValues] = useImmer(state);

  const getDates = useCallback(async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setValues((draft) => {
        draft.topRated = topRated;
        draft.popular = popular;
        draft.airingToday = airingToday;
      });
    } catch {
      setValues((draft) => {
        draft.error = "Can't find TV information.";
      });
    } finally {
      setValues((draft) => {
        draft.loading = false;
      });
    }
  }, [setValues]);

  useEffect(() => {
    getDates();
  }, [getDates]);

  return (
    <TVPresenter
      topRated={values.topRated}
      popular={values.popular}
      airingToday={values.airingToday}
      loading={values.loading}
      error={values.error}
    />
  );
};

export default TV;
