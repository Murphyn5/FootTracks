import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const [searchString, setSearchString] = useState("");
  // const [userSearched, setUserSearched] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchString.length === 0) {
      setSearchString("");
      return history.push(`/users/search/`);
    } else {
      setSearchString("");
      return history.push(`/users/search/${searchString}`);
    }
  };

  return (
    <div className="mobile-search-container">
      <form className="mobile-search-container-form" onSubmit={onSubmit}>
        <input
          className="mobile-search-container-input"
          type="text"
          placeholder="Search for an athlete..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        ></input>
        <button className="magnifying-css" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
