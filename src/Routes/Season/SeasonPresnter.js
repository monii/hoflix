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
  height: 100vh;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
  animation-name: blur;
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-delay: 1s;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const Title = styled.p`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
`;

const SeasonDiv = styled.div`
  margin-top: 30px;
`;

const SeasonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  gap: 25px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 200px;
  margin-bottom: 15px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const SeasonName = styled.span`
  padding-left: 10px;
  display: block;
  margin-bottom: 3px;
  font-size: 12x;
`;

const SeasonPresnter = ({ season, error, loading, result, id }) =>
  loading ? (
    <>
      <Helmet>
        <title> TV | HO!FLEX</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Helmet>
        <title>{result ? result.original_name : "TV"}| HO!FLEX</title>
      </Helmet>
      <Container>
        <SubMenu isMovie={false} id={id} />
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <SeasonDiv>
          <Title>Season</Title>
          <SeasonContainer>
            {season.map((data) => (
              <div key={season.id}>
                <Image
                  bgUrl={
                    data.poster_path
                      ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
                      : "/assets/noPosterSmall.png"
                  }
                />
                <SeasonName>{data.name}</SeasonName>
              </div>
            ))}
          </SeasonContainer>
        </SeasonDiv>
      </Container>
    </>
  );

SeasonPresnter.prototype = {
  season: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default SeasonPresnter;
