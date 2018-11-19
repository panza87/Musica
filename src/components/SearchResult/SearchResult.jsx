import React from 'react';
import './SearchResult.scss';

const SearchResult = (props) => {
  console.log(props.item)
  return (
    <div className='col-6'>
      <div className='search-result'>
        <img width='88' height='88' src={props.item.artworkUrl100} alt={props.item.collectionName + ' album cover'}/>
        <div className='meta-data'>
          <h3>{props.item.artistName}</h3>
          <h4>{props.item.trackName}</h4>
        </div>
        <div className='audio-wrapper'>
          <audio height='30' src={props.item.previewUrl} controls='controls'></audio>
        </div>
      </div>
    </div>
  )
}

export default SearchResult;
