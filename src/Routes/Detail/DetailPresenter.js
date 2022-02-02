import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import SubMenu from "../../Components/SubMemu";
import Helmet from "react-helmet";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const ImdbIcon = styled.div`
  margin-bottom: 20px;
  display: inline-block;
  background-color: rgb(226, 182, 22);
  color: rgb(0, 0, 0);
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
`;

const DetailPresenter = ({ result, loading, error, isMovie, id }) => {
  return loading ? (
    <>
      <Helmet>
        <title>{isMovie ? "Movie" : "TV"} | HO!FLEX</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Helmet>
        <title>
          {isMovie && result ? result.original_title : result.original_name} |
          HO!FLEX
        </title>
      </Helmet>
      <Container>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <SubMenu isMovie={isMovie} id={id} />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : "/assets/noPosterSmall.png"
            }
          />
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date &&
                  result.release_date.length > 0 &&
                  result.release_date.substring(0, 4)}
              </Item>
              <Item>
                {result.first_air_date &&
                  result.first_air_date.length > 0 &&
                  result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
            </ItemContainer>
            {isMovie && result.imdb_id ? (
              <ImdbIcon>
                {" "}
                <a
                  target="_blank"
                  href={`https://imdb.com/title/${result.imdb_id}`}
                  rel="imdb site noreferrer"
                >
                  imdb
                </a>
              </ImdbIcon>
            ) : null}
            <Overview>{result.overview}</Overview>
          </Data>
        </Content>
      </Container>
    </>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default DetailPresenter;
