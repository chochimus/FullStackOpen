import { useEffect, useState } from "react";
import axios from "axios";

const CountryDisplay = ({ country }) => {
  const languages = country.languages;
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </>
  );
};

const CountriesDisplay = ({ countries, onShowDetails }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => onShowDetails(country)}>show</button>
          </li>
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return <CountryDisplay country={country} />;
  }
};

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [countriesFound, setCountriesFound] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (country) {
      console.log("fetching countries...");
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const countries = response.data.filter((d) =>
            d.name.common.toLowerCase().includes(country.toLowerCase())
          );
          setCountriesFound(countries);
        });
    }
  }, [country]);

  const handleShowDetails = (country) => {
    setCountriesFound([country]);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setCountry(searchField);
  };

  return (
    <>
      <form onSubmit={onSearch}>
        find countries
        <input value={searchField} onChange={handleSearchFieldChange} />
      </form>
      <CountriesDisplay
        countries={countriesFound}
        onShowDetails={handleShowDetails}
      />
    </>
  );
};

export default App;
