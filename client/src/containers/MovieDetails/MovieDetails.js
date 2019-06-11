import React, { useEffect , useState } from 'react';
import './MovieDetails.css';
import { baseUrl, posterUrl, imdbUrl } from '../../config';
import axios from 'axios';
import moment from 'moment';

const MovieDetails = (props) => {

  const [ movie , setMovie ] = useState({});
  const [ mobile, setMobile ] = useState(false);
  const { id } = props.match.params;


  const checkDocument = async (id) => {
    await axios.get(`${baseUrl}/check/${id}`)
      .then(res => {
        if (res.status === 200) {
          res.data._id &&
          props.history.push(`/play/${res.data._id}`);
        } else {
          createDocument(id);
        }
      });
  };

  const sendToDetails = (id) => {
    window.open( imdbUrl + id , '_blank');
  };

  const parseText = function(text, limit){
    if (text.length > limit){
      for (let i = limit; i > 0; i--){
        if(text.charAt(i) === ' ' && (text.charAt(i-1) !== ','||text.charAt(i-1) !== '.'||text.charAt(i-1) !== ';')) {
          return text.substring(0, i) + '...';
        }
      }
    return text.substring(0, limit) + '...';
    } else return text;
  };

  const fetchMovieDetails = async (id) => {
    return axios.get(`${baseUrl}/details/${id}`);
  };

  const createDocument = async (id) => {
    await axios.get(`${baseUrl}/create/${id}`)
      .then(res => {
        res &&
        props.history.push(`/play/${res.data._id}`);
      });
  };

  useEffect(() => {
    fetchMovieDetails(id)
      .then(res => {
        setMovie(res.data);
      })
      .then(res => {
        if (window.innerHeight <= 568) {
          setMobile(true);
        }
      });

  }, [id]);

  if (mobile) {
      return (
        <div className="full">
        {movie.title && (movie.overview.length >= 160) &&
          <div className="movie_card item">
            <div className="info_section">
              <div className="movie_header">
                <img className="small" src={posterUrl +'w500' + movie.poster_path} alt={movie.title}/>
                <h1>{movie.title}</h1>
                <h4>{moment(movie.release_date).format('YYYY')}</h4>
                <span className="minutes">{movie.runtime} min</span>
                <p className="type">{movie.genres[0].name}</p>
              </div>
              <div className="movie_desc">
                <p className="text">
                  {parseText(movie.overview, 160)}
                </p>
                <button onClick={() => sendToDetails(movie.imdb_id)} className="see">read more</button>
                <span className="helper"></span>
              </div>
              <div className="btn-container"><span onClick={() => checkDocument(movie.id)} className="btn btn-play">Play</span></div>
            </div>
            <div className="blur_back poster_back" style={{backgroundImage: `url(${posterUrl +'w500' + movie.poster_path})`}}></div>
          </div>
        }
        </div>
      );
  }
  return (
    <div className="full">
    {movie.title &&
      <div className="movie_card item">
        <div className="info_section">
          <div className="movie_header">
            <img className="small" src={posterUrl +'w500' + movie.poster_path} alt={movie.title}/>
            <h1>{movie.title}</h1>
            <h4>{moment(movie.release_date).format('YYYY')}</h4>
            <span className="minutes">{movie.runtime} min</span>
            {movie.genres.length &&
            <p className="type">{movie.genres[0].name}</p>
            }
          </div>
          <div className="movie_desc">
          {movie.overview.length >= 560 &&
          <span>
            <p className="text">
              {parseText(movie.overview, 560)}
            </p>
            <button onClick={() => sendToDetails(movie.imdb_id)} className="see">read more</button>
          </span>
          }
          {movie.overview.length < 560 &&
          <p className="text">
            {movie.overview}
          </p>
          }
          </div>
          <div className="btn-container"><span onClick={() => checkDocument(movie.id)} className="btn btn-play">Play</span></div>
          }
        </div>
        <div className="blur_back poster_back" style={{backgroundImage: `url(${posterUrl +'w500' + movie.poster_path})`}}></div>
      </div>
    }
    </div>
  );
};

export default MovieDetails;
