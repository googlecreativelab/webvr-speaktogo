/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * Very simple library to load and play sounds with Web Audio API.
 */
class SoundBoard {

	/**
	 * Create a SoundBoard object
	 *
	 * @param {Object} sounds	the id and sound sources
	 */

	constructor ( sounds ) {

		const audio = new Audio();
		this.canPlayMp3 = audio.canPlayType( 'audio/mp3' ) !== '';
		this.canPlayOgg = audio.canPlayType( 'audio/ogg' ) !== '';

		this.sounds = sounds;

		let AudioContext = window.AudioContext || window.webkitAudioContext;

		if( AudioContext === undefined ) {
			this.soundEnabled = false;
			return;
		}

		this.soundEnabled = true;
		this.context = new AudioContext();
		this.buffers = {};

		for( const j in this.sounds ) {
			this.loadFile( j, this.sounds[ j ] );
		}

	}

	/**
	 * Play a previously loaded sound by id
	 *
	 * @param {string} id	Play the sound with the passed if
	 */

	play( id ) {

		if( !this.soundEnabled ) return;

		const source = this.context.createBufferSource();
		source.buffer = this.buffers[ id ];
		source.connect(this.context.destination);
		source.start(0);

	}

	/**
	 * Load a sound via XmlHttpRequest and decodes it
	 * with Web Audio decodeAudioData
	 *
	 * @param {string} id		id of the sound to load
	 * @param {string} path		path to the file to load, without extension
	 */

	loadFile( id, file ) {

		const context = this.context;
		const buffers = this.buffers;

		const extension = this.canPlayMp3 ? '.mp3' : '.ogg';

		const request = new XMLHttpRequest();
		request.open('GET', file + extension, true);
		request.responseType = 'arraybuffer';

		request.onload = () => {
			context.decodeAudioData(request.response, buffer => {
				buffers[ id ] = buffer;
			}, () => {
				console.log( 'error' );
			});
		}
		request.send();

	}

}
