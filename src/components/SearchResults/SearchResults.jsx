import React from 'react';
import SearchResult from '../SearchResult/SearchResult';
import spinner from '../../images/spinner.png';

class SearchResults extends React.Component {
  render() {
    const searchResults = this.props.results.results || [];
    return(
      <div className='container'>
        <div className='search-results'>
          <div className='spinner-container'>
            <img src={spinner} className={this.props.spinner ? 'spinner active' : 'spinner'} alt="logo" />
          </div>
          <div className='row'>
            {searchResults.map(item => {
              return (
                <SearchResult key={item.trackId} item={item}/>
              )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
