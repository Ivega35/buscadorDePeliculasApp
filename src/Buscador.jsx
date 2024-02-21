import { useState } from "react"


export const Buscador = () => {
    
    const urlBase ='https://api.themoviedb.org/3/search/movie'
    const api_key='SECRET KEY'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }
    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${api_key}`)
            const data = await response.json()
            setPeliculas(data.results)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container'>
            < h1 className="title">Buscá tu pelicula</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busca una pelicula" value={busqueda} onChange={handleInputChange} />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <h5 className="title">{pelicula.title}</h5>
                        <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
                        <p>Votos de los fans: ⭐{parseInt(pelicula.vote_average)}/10</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
