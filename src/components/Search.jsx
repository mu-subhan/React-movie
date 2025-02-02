import PropTypes from "prop-types";
import { useEffect } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
    useEffect(()=>{

    },[])
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search"/>
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};


Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Search;
