import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'

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

const fetchMovies = async ()=>{
  try {
    const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,API_OPTIONS)
  } catch (error) {
    console.log(`Error fetching movies: ${error}`);
    setErrorMessage("Error fetching movies. Please try again later.")
    
  }
}

  useEffect(()=>{

  },[])

  return (
    <main>
       <div className="pattern">
        <div className="wrapper">
          <header>
            <img src='./hero.png' alt="herp banner"/>
            <h1>Find <span className='text-gradient'>Movies</span>
            You will Enjoy without Hassle </h1>
            </header>

       <section className='all-movies'>
<h2>All movies</h2>
{errorMessage && <p className='text-red-500'>{errorMessage} </p>}
       </section>

            <Search searchTerm ={searchTerm} setSearchTerm={setSearchTerm} />

            <h1 className='text-white'>{searchTerm} </h1>
        </div>
       </div>
        
    </main>
  )
}

export default App
