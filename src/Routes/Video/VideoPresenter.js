import { useEffect, useRef, useState } from "react";
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

const VideoContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 600px;
  height: 351px;
  position: relative;
`;

const SliderLeftBtn = styled.button`
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 0%;
  border: none;
  color: #3ca0e7;
  font-size: 30px;
  padding: 10px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  z-index: 10;
  opacity: 0.7;
  transition: all 350ms ease-in-out;
  transform: translate(0%, -50%);
  -ms-transform: translate(-0%, -50%);
  &:hover {
    opacity: 1;
    transition: all 350ms ease-in-out;
  }
`;

const SliderRigthBtn = styled.button`
  position: absolute;
  display: inline-block;
  top: 50%;
  right: 0%;
  border: none;
  color: #3ca0e7;
  font-size: 30px;
  padding: 10px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  z-index: 10;
  opacity: 0.7;
  transition: all 350ms ease-in-out;
  transform: translate(0%, -50%);
  -ms-transform: translate(0%, -50%);
  &:hover {
    opacity: 1;
    transition: all 350ms ease-in-out;
  }
`;

const VideoSlide = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  & iframe {
    width: 100%;
    height: 351px;
  }
`;

const NothingAlret = styled.div``;

const useShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rigthBtn = useRef();
  const leftBtn = useRef();
  const slide = useRef();

  const handleRigthBtn = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handleLeftBtn = () => {
    setCurrentIndex(currentIndex - 1);
  };
  useEffect(() => {
    if (rigthBtn.current) {
      rigthBtn.current.addEventListener("click", handleRigthBtn);
    }
    if (leftBtn.current) {
      leftBtn.current.addEventListener("click", handleLeftBtn);
    }
    return () => {
      if (rigthBtn.current) {
        rigthBtn.current.removeEventListener("click", handleRigthBtn);
      }
      if (leftBtn.current) {
        leftBtn.current.removeEventListener("click", handleLeftBtn);
      }
    };
  }, []);

  return {
    rigthBtn,
    leftBtn,
    slide,
    currentIndex,
    handleRigthBtn,
    handleLeftBtn,
  };
};

const VideoPresenter = ({
  result,
  loading,
  isMovie,
  video,
  id,
  videosLen,
  error,
}) => {
  const {
    rigthBtn,
    leftBtn,
    slide,
    currentIndex,
    handleRigthBtn,
    handleLeftBtn,
  } = useShow();
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
        <SubMenu isMovie={isMovie} id={id} />
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        {video.length === 0 && (
          <NothingAlret>표시 가능한 동영상이 없습니다.</NothingAlret>
        )}
        <VideoContainer>
          {video.map((trailer, index) => (
            <VideoSlide
              key={index.toString()}
              ref={slide}
              style={
                index === currentIndex
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
              ></iframe>
            </VideoSlide>
          ))}
          {videosLen > 1 && (
            <>
              <SliderLeftBtn
                ref={leftBtn}
                onClick={handleLeftBtn}
                style={{ display: currentIndex > 0 ? "block" : "none" }}
              >
                &#10094;
              </SliderLeftBtn>
              <SliderRigthBtn
                ref={rigthBtn}
                onClick={handleRigthBtn}
                style={{
                  display: currentIndex < videosLen - 1 ? "block" : "none",
                }}
              >
                &#10095;
              </SliderRigthBtn>
            </>
          )}
        </VideoContainer>
      </Container>
    </>
  );
};

VideoPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isMovie: PropTypes.bool.isRequired,
  videos: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default VideoPresenter;
