import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import SeasonPresnter from "./SeasonPresnter";
import { tvApi } from "../../api";

const Season = (props) => {
  const state = {
    season: [],
    error: null,
    loading: true,
    result: null,
    id: "",
  };
  const [values, setValues] = useImmer(state);

  useEffect(() => {
    const getDates = async () => {
      const {
        history: { push },
        match: {
          params: { id },
        },
      } = props;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return push("/");
      }
      let result = null;
      let season = [];
      try {
        ({
          data: result,
          data: { seasons: season },
        } = await tvApi.showDetail(parsedId));
        setValues((draft) => {
          draft.result = result;
          draft.season = season;
        });
      } catch {
        setValues((draft) => {
          draft.error = "Can't find Season information.";
        });
      } finally {
        setValues((draft) => {
          draft.loading = false;
          draft.id = id;
        });
      }
    };
    getDates();
  }, []);

  return (
    <>
      <SeasonPresnter {...values}></SeasonPresnter>
    </>
  );
};

export default Season;
