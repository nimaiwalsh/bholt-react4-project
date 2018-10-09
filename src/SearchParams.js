import React from "react";
import SearchBox from "./SearchBox";

class SearchParams extends React.Component {
  render() {
    return (
      <div className="search-route">
        <SearchBox {...this.props} />
      </div>
    );
  }
}

export default SearchParams;