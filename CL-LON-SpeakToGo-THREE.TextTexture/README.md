# THREE.TextTexture

A wrapper of THREE.CanvasTexture to easily draw text, used for setting up UIs in VR quickly.

This is not an official Google product.

#### How to use ####
Include the script in your project after `three.js` has been included:
```html
<script src="three.min.js"></script>
<script src="Text.js"></script>
```
Create a Text object passing your WebGLRenderer instance, width and height of the resulting texture:
```js
let text = new Text( renderer, 1024, 512 );
scene.add( text.mesh );
```
Add the mesh object to your scene, that will add a plane mesh to your scene with the aspect ratio of the specified dimensions.

Set text whenever you need an update by using Text.set( sentences ):
```js
// sentences can be a single sentence
text.set( 'hello world' );

// or an array of sentences that will act as multiline
text.set( [ 'hello', 'there,', 'world' ] );
```
Text has a built-in text-splitting mechanism that will prevent lines from being cut horizontally.
#### Changing styles ####
The text uses a white 50px Robot font with some drop shadow effect. Make sure you include in your HTML the fontface you want to use.
To change style or effects, you'll have to change the code Text.set.
#### License ####

Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
