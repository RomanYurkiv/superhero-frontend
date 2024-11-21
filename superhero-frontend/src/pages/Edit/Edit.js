import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSuperheroById, updateSuperhero } from '../../api/superheroApi';

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuperhero = async () => {
      try {
        const superhero = await fetchSuperheroById(id);
        setName(superhero.name);
        setPower(superhero.power);
        setDescription(superhero.description);
      } catch (err) {
        setError('Не вдалося завантажити дані супергероя');
      }
    };

    fetchSuperhero();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const updatedSuperhero = { name, power, description };
      await updateSuperhero(id, updatedSuperhero);

      navigate('/home');
    } catch (err) {
      setError('Не вдалося оновити супергероя');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Редагувати супергероя</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Сила</label>
          <input
            type="text"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Опис</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Оновлюю...' : 'Оновити'}
        </button>
      </form>
    </div>
  );
};

export default Edit;