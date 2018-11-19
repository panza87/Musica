import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Navigation from './components/Navigation/Navigation';
import SearchResults from './components/SearchResults/SearchResults';
import searchIcon from './images/search-icon.png';

const LINKS = [
  { label: 'Contact', url: 'http://www.google.com' },
  { label: 'Twitter', url: 'https://www.google.com' },
  { label: 'Instagram', url: 'https://www.google.com' },
];

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      searchHistory: [],
      searchResults: [],
      resultsExpanded: false,
      navigationOpen: false,
      spinner: false
    }
  }

  // call itunes API
  itunesSearch = () => {
    if (this.state.searchTerm.length > 0) {
      const encodedSearchTerm = encodeURIComponent(this.state.searchTerm).replace(/%20/g, "+");
      const encodedURI = `https://itunes.apple.com/search?term=${encodedSearchTerm}`;
      // start spinner, reduce size of hero, reset any previous results
      this.setState({
        spinner: true,
        resultsExpanded: true,
        searchResults: []
      })
      axios.get(encodedURI)
        .then(res => {
          const searchResults = res.data;
          // if api call successful, add search results to state and stop spinner
          this.setState({
            searchResults,
            spinner: false
          });
        })
    }
  }

  // call itunes search on enter while in search field
  itunesSearchKeyboard = (target) => {
    if(target.charCode === 13){
      this.itunesSearch();
    }
  }

  // track search term in state for use with api call
  handleSearchTermChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  // toggle navigation from hamburger menu
  toggleNavigation = () => {
    if (this.state.navigationOpen) {
      this.setState({
        navigationOpen: false
      })
    } else {
      this.setState({
        navigationOpen: true
      })
    }
  }

  // reset state for fresh page
  resetSearch = () => {
    this.setState({
      searchResults: [],
      resultsExpanded: false,
      spinner: false
    })
  }
  render() {
    return (
      <div className={(this.state.navigationOpen ? 'container-nav-open' : '')}>
        <div className={'App ' + (this.state.navigationOpen ? 'nav-open' : '')}>
          <Navigation links={LINKS} toggleNavigation={this.toggleNavigation} resetSearch={this.resetSearch}/>
          <div className='content'>
            <div className={'App-header ' + (this.state.resultsExpanded ? 'shrink' : '')}>
              <div className='hero'>
                <h1>Search for music, games, videos and many more.</h1>
                <input onKeyPress={this.itunesSearchKeyboard} type='text' value={this.state.searchTerm} onChange={this.handleSearchTermChange} placeholder='Search anything...'/>
                <button className='search-icon' onClick={this.itunesSearch}><img src={searchIcon} alt='search icon'/></button>
                <button className='search' type="button" onClick={this.itunesSearch}>Go</button>
              </div>
            </div>
            <SearchResults spinner={this.state.spinner} results={this.state.searchResults} />
          </div>
          <footer>
            <p>&copy; Copyright Musica app PTY LTD, 2019.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
