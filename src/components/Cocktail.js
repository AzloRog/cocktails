import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id, img, name, alcoholic}) => {
  return (
    <section className="cocktail">
      <img src={img} alt={name + " image"}/>
      <footer className="cocktail-footer">
        <h3>{name}</h3>
        <p>{alcoholic}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          Show more
        </Link>
      </footer>
    </section>
  )
}

export default Cocktail
