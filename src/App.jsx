import { useEffect, useState } from 'react'
import './App.css'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { updateSearchCount } from './appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY= import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS={
  method:'GET',
  headers:{
    accept:"application/json",
    Authorization:`Bearer ${API_KEY}`
  }
}

function App() {

  const [searchTerm,setSearchTerm] = useState('');
  const [errorMessage,setErrorMessage] = useState('')
  const [movieList,setMovieList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [debouncedSearchTerm,setDebounceSearchTerm] = useDebounce('');

  // Debounce the search term to prevent making too many API requests by waiting for the user to stop typing before making the request.
  useDebounce(()=>setDebounceSearchTerm(searchTerm),500,[searchTerm])


const fetchMovies = async ( query ='')=>{
  setIsLoading(true);
  setErrorMessage('')
  try {
    const endpoint=
    query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
    `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,API_OPTIONS)
    
    if(!response.ok){
      throw new Error('Failed to fetch movie data')
    }
    const data = await response.json(); 
    // console.log(data);

    if(data.response === 'false'){
      setErrorMessage(data.Error || "failed to fetch movie");
      setMovieList([]);
      return;
    }
    setMovieList(data.results || []) 

   if(query && data.results.length > 0){
     updateSearchCount(query,data.results[0]);   
   }
  } catch (error) {
    console.log(`Error fetching movies: ${error}`);
    setErrorMessage("Error fetching movies. Please try again later.")
  } finally{
    setIsLoading(false)
  }
}

  useEffect(()=>{
fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])

  return (
    <main>
       <div className="pattern">
        <div className="wrapper">
          <header>
            <img src='./hero.png' alt="herp banner"/>
            <h1>Find <span className='text-gradient'>Movies</span>
            You will Enjoy without Hassle </h1>
            </header>

<Search searchTerm ={searchTerm} setSearchTerm={setSearchTerm} />
<h1 className='text-white'>{searchTerm} </h1>
       <section className='all-movies'>
<h2 className='mt-[40px]'>All movies</h2>
{isLoading ? (
  <Spinner/>
) : errorMessage ? (
  <p className='text-red-500'>{errorMessage} </p>
):(
  <ul>
    {movieList.map((movie)=>(
      <MovieCard key={movie.id} movie={movie}/>
    ))}
  </ul>
) }
 
       </section>


        </div>
       </div>
        
    </main>
  )
}

export default App
