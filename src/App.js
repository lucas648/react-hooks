import React, { useState, useEffect } from 'react';

export default function App() {

  const [repositories, setRepositories] = useState([]);
  const [location, setLocation] = useState({});

  useEffect(()=>{
    navigator.geolocation.watchPosition(handlePosition)
  },[])

  const handlePosition = ({coords}) =>{
    const {latitude, longitude} = coords;
    setLocation({latitude,longitude})
  }

  useEffect( ()=>{
    async function returnData(){
      const response =  await fetch('https://api.github.com/users/lucas648/repos');
      const data = await response.json();
  
      setRepositories(data);
    }

    returnData()
  }, []);

  useEffect(()=>{
    const favorites = repositories.filter(repo=> repo.favorite);

    document.title = `${favorites.length} repos favoritos!`
  },[repositories]);

  const handleFavorite = id =>{
    const newRepositories = repositories.map(repo=>{
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo;
    })

    setRepositories(newRepositories)
  }

  return (
    <div className="App" style={{display: 'flex'}}>
      <div>
        <ul>
          {
            repositories.map(repository=>(
              <li key={repository.id}>
                {repository.name}
                {repository.favorite && <span>(Favorito)</span>}
                <button 
                  onClick={()=>{handleFavorite(repository.id)}}
                >
                  {!repository.favorite ? 'Favoritar' : 'Desfavoritar'}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <div>
          <h1>Latitude:</h1>
          <label>{location.latitude}</label>
        </div>
        <div>
          <h1>Longitude:</h1>
          <label>{location.longitude}</label>
        </div>
      </div>
    </div>
  );
}


