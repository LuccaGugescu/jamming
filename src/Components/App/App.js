import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResult/SearchResult';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], playlistName: "", playlistTracks: [] };
  }
  addTrack = track => {
      let tracks = this.state.playlistTracks;
      if (tracks.find(savedTracks => savedTracks.id === track.id)) {
        return ;
      }
      tracks.push(track);
      this.setState({playlistTracks: tracks}); 
  } 
  removeTrack = (track) => {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => track.id !== currentTrack.id);
    this.setState({playlistTracks: tracks});
  }
  updatePlaylistName = (name) => {
    this.setState({playlistName: name});
  }
  savePlaylist = () => {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }
  search = (term) => {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} addTrack={this.addTrack} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}
