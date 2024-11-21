import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.module.css';

const Home = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/superheroes?page=${page}&limit=5`
        );
        setSuperheroes(response.data.superheroes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Помилка при завантаженні супергероїв:', error);
      }
    };

    fetchSuperheroes();
  }, [page]);

  return (
    <div className="home">
      <h1>Список супергероїв</h1>
      <ul className="superhero-list">
        {superheroes.map((hero) => (
          <li key={hero.id}>
            <Link to={`/superhero/${hero.id}`}>{hero.nickname}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Попередня
        </button>
        <span>Сторінка {page} з {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Наступна
        </button>
      </div>
    </div>
  );
};

export default Home;