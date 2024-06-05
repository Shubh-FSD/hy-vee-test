import React, { useState } from 'react';
import axios from 'axios';

const Api = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [ageResponse, genderResponse, countryResponse] = await Promise.all([
        axios.get(`https://api.agify.io?name=${name}`),
        axios.get(`https://api.genderize.io?name=${name}`),
        axios.get(`https://api.nationalize.io?name=${name}`)
      ]);

      setAge(ageResponse.data.age);
      setGender(genderResponse.data.gender);
      if (countryResponse.data.country.length > 0) {
        setCountry(countryResponse.data.country[0].country_id);
      } else {
        setCountry('Unknown');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Guess Age, Gender, and Country</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {age && (
        <div>
          <h2>Results</h2>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Country: {country}</p>
        </div>
      )}
    </div>
  );
};

export default Api;
