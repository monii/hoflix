import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import SubMenu from '../../Components/SubMemu';
import Helmet from 'react-helmet';

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

const CountryDiv = styled.div`
  margin-top: 30px;
}`;

const Title = styled.p`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
`;

const County = styled.div`
  margin-bottom: 8px;
  font-size: 20px;
`;

const CompanyDiv = styled.div`
  margin-top: 30px;
`;

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  gap: 25px;
`;
const ImageContainer = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 10px;
  margin-bottom: 5px;
  position: relative;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 100px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;
const CompanyName = styled.span`
  display: block;
  margin-bottom: 3px;
  font-size: 10px;
`;
const ProductionPresnter = ({
  countries,
  companies,
  error,
  isMovie,
  loading,
  result,
  id,
}) =>
  loading ? (
    <>
      <Helmet>
        <title>{isMovie ? 'Movie' : 'TV'} | HO!FLEX</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Helmet>
        <title>
          {isMovie && result ? result.original_title : result.original_name}|
          HO!FLEX
        </title>
      </Helmet>
      <Container>
        <SubMenu isMovie={isMovie} id={id} />
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <CountryDiv>
          <Title>Production Countries</Title>
          {countries.map((country) => (
            <>
              <County>-{country.name}</County>
            </>
          ))}
        </CountryDiv>
        <CompanyDiv>
          <Title>Production Companies</Title>
          <LogoContainer>
            {companies.map((company) => (
              <>
                <div>
                  <ImageContainer>
                    <Image
                      bgUrl={
                        company.logo_path
                          ? `https://image.tmdb.org/t/p/original/${company.logo_path}`
                          : '/assets/noPosterSmall.png'
                      }
                    />
                  </ImageContainer>
                  <CompanyName>{company.name}</CompanyName>
                </div>
              </>
            ))}
          </LogoContainer>
        </CompanyDiv>
      </Container>
    </>
  );

ProductionPresnter.prototype = {
  countries: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object.isRequired,
};

export default ProductionPresnter;
