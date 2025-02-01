
import { useState } from 'react'
import './App.css'
import Search from './components/Search'

function App() {
  const [searchTerm,setSearchTerm] = useState('');
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
        </div>
       </div>
        
    </main>
  )
}

export default App
