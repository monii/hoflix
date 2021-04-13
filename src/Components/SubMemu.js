import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SubMuenDiv = styled.div`
  margin-bottom: 30px;
`;

const SubMuenUl = styled.ul`
  list-style: none;
  display: inline-block;
  position: relative;
  text-decoration: none;
  text-align: center;
  font-family: arvo;
`;

const SubMuenLi = styled.li`
  list-style: none;
  margin: 0 auto;
  border-left: 2px solid #3ca0e7;
  display: inline-block;
  padding: 0 30px;
  position: relative;
  text-decoration: none;
  text-align: center;
  font-family: arvo;
`;
const Alink = styled(Link)`
  margin: 0 auto;
  display: inline-block;
  padding: 0 30px;
  position: relative;
  text-decoration: none;
  text-align: center;
  font-family: arvo;
  &:hover {
    color: #3ca0e7;
  }
`;

const SubMenu = ({ id, isMovie = true }) => {
  return (
    <SubMuenDiv>
      {isMovie ? (
        <SubMuenUl>
          <SubMuenLi>
            <Alink to={`/movie/${id}`}>DETAIL</Alink>
          </SubMuenLi>
          <SubMuenLi>
            <Alink to={`/movie/${id}/video`}>VIDEO</Alink>
          </SubMuenLi>
          <SubMuenLi>
            <Alink to="/">PRODUCT</Alink>
          </SubMuenLi>
        </SubMuenUl>
      ) : (
        <SubMuenUl>
          <SubMuenLi>
            <Alink to={`/show/${id}`}>DETAIL</Alink>
          </SubMuenLi>
          <SubMuenLi>
            <Alink to={`/show/${id}/video`}>VIDEO</Alink>
          </SubMuenLi>
          <SubMuenLi>
            <Alink to="/">PRODUCT</Alink>
          </SubMuenLi>
          <SubMuenLi>
            <Alink to="/">SEASON</Alink>
          </SubMuenLi>
        </SubMuenUl>
      )}
    </SubMuenDiv>
  );
};

SubMenu.propTypes = {
  id: PropTypes.string.isRequired,
  isMovie: PropTypes.bool.isRequired,
};

export default SubMenu;
