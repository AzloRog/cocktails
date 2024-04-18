import React, {useRef, useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm, searchTerm} = useGlobalContext();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleInput = () => {
    setSearchTerm(inputRef.current.value);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="cocktail">Search your favorite cocktail!</label>
          <input type="text" id="cocktail"  onChange={handleInput} ref={inputRef} />
        </div>
      </form>
    </div>
  )
}

export default SearchForm
