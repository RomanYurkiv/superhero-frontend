import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSuperheroById } from '/Project/superhero-frontend/superhero-frontend/src/api/superheroApi';

const Details = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    fetchSuperheroById(id)
      .then((response) => setSuperhero(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!superhero) return <p>Loading...</p>;

  return (
    <div>
      <h1>{superhero.nickname}</h1>
      <p>{superhero.real_name}</p>
      <p>{superhero.origin_description}</p>
      <img src={superhero.images[0]} alt={superhero.nickname} />
    </div>
  );
};

export default Details;