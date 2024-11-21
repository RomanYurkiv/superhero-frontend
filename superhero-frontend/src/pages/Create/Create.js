import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSuperhero } from '../../api/superheroApi';

const Create = () => {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newSuperhero = { name, power, description };
      await createSuperhero(newSuperhero);
      navigate('/home');
    } catch (err) {
      setError('Не вдалося створити супергероя');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Створити нового супергероя</h2>
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
          {loading ? 'Створюю...' : 'Створити'}
        </button>
      </form>
    </div>
  );
};

export default Create;