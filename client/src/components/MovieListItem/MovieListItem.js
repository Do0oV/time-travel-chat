import React, { useState } from 'react';
import './MovieListItem.css';
import { posterUrl } from '../../config';
import { Link } from 'react-router-dom';

const MovieListItem = ({movie}) => {

  const [isBrokenLink , setIsBrokenLink] = useState(false);

  const addDefaultImg = (e) => {
    setIsBrokenLink(true);
  };

  return (
      <div className="movie-card">
      {!isBrokenLink &&
        <Link to={`/movie/${movie.id}`}>
          <img
          onError={(e)=>addDefaultImg(e)}
          src={posterUrl + 'w500' + movie.poster_path}
          className="movie-img"
          alt={movie.title}
          />
        </Link>
      }
      </div>
    );
}

export default MovieListItem;
