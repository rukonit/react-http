import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])

  const [error, setError] = useState()

  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true)
    setError(null)
    
    try {
      const response  = await fetch('https://swapi.dev/api/films/', {})


      if(!response.ok) {
        throw new Error('Something went wrong')
      }
     
      const data = await response.json()

      

      
        const transformedMovies = data.results.map(
          movie => { 
            return {
            id: movie.eposode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
          }
          }
        );
        setMovies(transformedMovies)
        
    }
    catch (error){
       setError(error)
    }
    setIsLoading(false)
    };

    let content  = <p>No movie found.</p>

    if(movies.length > 0) {
      content = <MoviesList movies={movies} />
    }

    if(error) {
      content = <p>{error.message}</p>
    }
  
    if(isLoading) {
      content = <p>Loading...</p>
    }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        
      </section>
    </React.Fragment>
  );
}

export default App;
