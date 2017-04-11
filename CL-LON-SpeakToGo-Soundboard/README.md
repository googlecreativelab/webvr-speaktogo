# Soundboard

Very simple library to load and play sounds with Web Audio API.

This is not an official Google product.

#### How to use ####
Include the script in your project:
```html
<script src="Soundboard.js"></script>
```
Define a new instance of `Soundboard`, providing an array of sources ( `'sound_id': 'path/to/file_without_extension'` ):
```js
let soundboard = new SoundBoard({
    'ok': 'sounds/ok',
    'error': 'sounds/error'
});
```
Soundboard will look for the filenames, load them using an .mp3 or .ogg extension depending on the browser playback support, and map them to the specified sound_id.

To play back the sound when needed, just use `.play( sound_id )`:
```js
soundboard.play( 'ok' );
```

#### License ####

Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
