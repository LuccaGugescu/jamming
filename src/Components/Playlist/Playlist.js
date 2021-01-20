import React from 'react';
import './Playlist.css';
import { Tracklist } from '../Tracklist/Tracklist';

export class Playlist extends React.Component {
    handleNameChange = (e) => {
        this.props.onNameChange(e.target.value);
    }
    render() {
        return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
            <Tracklist tracks={this.props.playlistTracks}  onAdd={this.props.addTrack} onRemove={this.props.onRemove} isRemoval={true} />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
        )

    }
} 