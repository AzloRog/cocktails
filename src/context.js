import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import useTest from './components/useTest.js'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("a");
  const [isLoading, setIsLoading] = useState(true);

  const name = useTest();
  const fetchData = async () => {

    setIsLoading(true);

  
    try {
      const data = await fetch(url + searchTerm);
      const json = await data.json();
      const drinks = json.drinks;
      if (drinks) {
        const newDrinks = drinks.map((drink) => (
          {
            id: parseInt(drink.idDrink),
            name: drink.strDrink,
            alcoholic: drink.strAlcoholic,
            img: drink.strDrinkThumb,
          }
        ))
        setList(newDrinks);
          
      }
      else {
        console.log('no drinks')
        setList([]);
      }

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);

  }
  useEffect(() => {
    fetchData();
    console.log("main useeffect");
  }, [searchTerm])
  return <AppContext.Provider value={{list, setSearchTerm, searchTerm, isLoading}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
