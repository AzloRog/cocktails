import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {list, isLoading} = useGlobalContext();


  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (list.length < 1) {
    return (
      <section className="section-title">
        no cocktails mathed your search criteria
      </section>
    )
  }
  return (
    <section className="section">
      <h2>Cocktails</h2>
      <div className="cocktails-center">
        {list.map(item => <Cocktail key={item.id} {...item}/> )}
      </div>
    </section>
  )
}

export default CocktailList
