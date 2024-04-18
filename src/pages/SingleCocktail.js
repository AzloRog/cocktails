import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import {useGlobalContext} from "../context.js"

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  let {id} = useParams();
  id = parseInt(id);

  const [params, setParams] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const findIngredients = (object) => {
      let keys = Object.keys(object).map(item => item.includes("strIngredient") ? object[item] : null);
      keys = keys.filter(key => key);
      return keys
    }

    try {
      const data = await fetch(url + id);
      let jdata = await data.json();
      jdata = jdata.drinks[0];

      if (jdata) {
        const obj = {
          name: jdata.strDrink,
          category: jdata.strCategory,
          glass: jdata.strGlass,
          instruction: jdata.strInstructions,
          ingredients: findIngredients(jdata),
          img: jdata.strDrinkThumb,
          alcoholic: jdata.strAlcoholic,


        }
        setParams(obj);
        console.log(jdata);

      }
      else {
        setParams(null);
      }

    }
    catch (error) {

      setParams({});
      console.log(error);
    }
    setIsLoading(false);

  }
  useEffect(() => {
    fetchData();
  }, [id])

  if (isLoading) {
    return <Loading />
  }
  if (params === null) {
    return <h2>There is not an element</h2>
  }
  const {alcoholic ,img, name, category, glass, instruction, ingredients} = params;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">Back</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={img} alt={name}/>
        <div className="drink-info">
          <p>
            <span className="drink-data">Name:</span> {name}
          </p>

          <p>
            <span className="drink-data">Category:</span> {category}
          </p>
          <p>
            <span className="drink-data">Glass:</span> {glass}
          </p>
          <p>
            <span className="drink-data">info:</span> {alcoholic}
          </p>
          <p>
            <span className="drink-data">Instruction:</span> {instruction}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span> {ingredients.join(', ')}
          </p>


        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
