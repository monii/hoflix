# :seedling: 리액트JS 챌린지 

- 기간 : 2021.03.29 ~ 2021.04.14
- 챌린지 참여 사이트 : 노마드 코더-리액트JS 영화 웹사이트 만들기(https://nomadcoders.co/react-for-beginners/lobby)

### :date: 2주동안 스케쥴
:heavy_check_mark:1일차 : Fundamentals(:book: #1.1 ~ #1.5) <br/>
:heavy_check_mark:2일차 : Array 매서드(:book:#1.6 ~ #1.8) <br/>
:heavy_check_mark:3일차 : React Router(:book: #2.1 ~ #2.2) <br/>
:heavy_check_mark:4일차 : React에서 CSS 적용하는 방법(with style-component)(:book: #3.0 ~ #3.4) <br/>
:heavy_check_mark:5,6일차 : 웹사이트 개발(Container Presenter Partten)(:book:#4.1 ~ #6.2) <br/>
:heavy_check_mark:7일차 : 휴일 :partying_face:<br/>
:heavy_check_mark:8,9일차 :복습 (:book: #6.8 ~ #6.9) <br/>
:heavy_check_mark:10,11일차 : React Hook(useState,useEffect...ect)(:book: #1.0 ~ #2.9) <br/>
:heavy_check_mark:12일차 : 복습 <br/>
:heavy_check_mark:13일차 : 복습 <br/>
:heavy_check_mark:14,15,16일차 : popconTime클론(Deployment to Netlify) <br/>

:red_circle: 자세한 스케쥴 및 강의 내용은 노마드 코더 사이트에서 보실 수 있습니다! <br/>
:red_circle: [과제 codeSandeBox](https://codesandbox.io/dashboard/drafts?workspace=6cc00266-fd13-495b-a7fb-310abec1080e)

-----------------
### :clap: 결과

:point_right:https://ho-flix.netlify.app

-----------------

### :computer: 개발환경
- 개발언어: javaScript,HTML5,CSS <br/>
- IDE: VScode <br/>
- API: https://developers.themoviedb.org/3 <br/>
```
onst api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const moviesApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
...
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
...
}
```
-----------------

### :computer: 상세
1.API<br/>
- [x] Now playing (Movie) <br/>
- [x] Upcoming (Movie) <br/>
- [x] Top Rated (TV) <br/>
- [x] Popular (TV, X) <br/>
- [x] Airing Today (TV) <br/>
- [x] TV Show Detail <br/>
- [x] Movie Detail <br/>
- [x] Search (Movie, TV) <br/>
- [x] IMDB Link <br/>
- [x] Tabs inside of Movie / Show Details (YT Videos, Production Company & Countries) <br/>
- [x] Collections Link <br/>
- [x] /collections Route <br/>
- [x] On TV Show, show seasons and creators <br/>

2.화면
- [x] Movie <br/>
- [x] TV <br/>
- [x] Detail <br/>
- [x] Search <br/>

--------------------------
  
### :pushpin: ToDo Update
* 2022-02-02
  * Class Component -> Function Component변경
  * Detail 페이지 상영,방영 날짜 null 처리  

:point_down:해야할것
* css수정
* react waring 수정( React Hook useEffect has a missing dependency: ...)








