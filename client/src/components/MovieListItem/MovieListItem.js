import React, { useState } from 'react';
import './MovieListItem.css';
import { Link } from 'react-router-dom';

const MovieListItem = ({movie}) => {

  const img_path = 'https://image.tmdb.org/t/p/w300';
  const [prob , setProb] = useState(false)
  const addDefaultImg = (e) => {
    /*e.target.src = `https://senseeventsl.files.wordpress.com/2018/02/not-found-logo.png`;*/
    setProb(true);
  };

    return (
        <div className="movie-card">
        {!prob &&

          <Link to={`/movie/${movie.id}`}>
            <img onError={(e)=>addDefaultImg(e)} src={img_path + movie.poster_path} className="movie-img" alt={movie.title}/>
          </Link>
        }
        </div>
      );
}

export default MovieListItem;
