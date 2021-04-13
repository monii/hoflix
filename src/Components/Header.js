import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Menu = styles.div`
margin-top:10px;
margin-bottom: 10px;
font-size:30px;
cursor:pointer;
`;

const Log = styles.span`
font-size:30px;
color:#00BFFF;
cursor:pointer;
`;

const SideNav = styles.div`
height: 100%;
width: ${(props) => (props.children[0].props.open ? '100%' : '0px')};
position: fixed;
z-index: 999;
top: 0;
left: 0;
background-color: #111;
overflow-x: hidden;
transition: 0.5s;
padding-top: 60px;
text-align:center;
`;

const Anchor = styles(Link)`
padding: 8px 8px 36px 32px;
text-decoration: none;
font-size: 30px;
color: #818181;
display: block;
transition: 0.3s;
&:hover {
    color: #f1f1f1;
}
`;

const CloseBtn = styles.span`
position: absolute;
top: 0;
right: 25px;
font-size: 36px;
margin-left: 50px;
cursor:pointer;
`;

const useMene = () => {
  const [open, setOpen] = useState(false);
  const meneBtn = useRef();
  const closeBtn = useRef();
  const movieBtn = useRef();
  const tvBtn = useRef();
  const searchBtn = useRef();

  const clickMenuBtn = () => {
    setOpen(true);
  };
  const clickCloseBtn = () => {
    setOpen(false);
  };
  const clickMovieBtn = () => {
    setOpen(false);
  };
  const clickTvBtn = () => {
    setOpen(false);
  };
  const clickSearchBtn = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (meneBtn.current) {
      meneBtn.current.addEventListener('click', clickMenuBtn);
      closeBtn.current.addEventListener('click', clickCloseBtn);
      movieBtn.current.addEventListener('click', clickMovieBtn);
      tvBtn.current.addEventListener('click', clickTvBtn);
      searchBtn.current.addEventListener('click', clickSearchBtn);
    }
  }, [open]);
  return { meneBtn, closeBtn, movieBtn, tvBtn, searchBtn, open };
};

const Header = () => {
  const { meneBtn, closeBtn, movieBtn, tvBtn, searchBtn, open } = useMene();
  return (
    <>
      <Menu ref={meneBtn} open={open}>
        &#9776; <Log>HO!FLIX</Log>
      </Menu>
      <SideNav>
        <CloseBtn ref={closeBtn} open={open}>
          &times;
        </CloseBtn>
        <Anchor to="/" ref={movieBtn} open={open}>
          <FontAwesomeIcon icon={faFilm} /> Movie
        </Anchor>
        <Anchor to="/tv" ref={tvBtn} open={open}>
          <FontAwesomeIcon icon={faTv} /> TV
        </Anchor>
        <Anchor to="/search" ref={searchBtn} open={open}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Anchor>
      </SideNav>
    </>
  );
};
export default Header;
