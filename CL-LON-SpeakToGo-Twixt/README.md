# Twixt

A very straightforward tweening library, with Promises.

This is not an official Google product.

#### How to use ####
Include the script in your project:
```html
<script src="Twixt.js"></script>
```
This will create a global **Twixt** object.

You can create twixted values by using `Twixt.create`:
```js
// Twixt.create takes an initial value and an easing mode
let a = Twixt.create( 0, 'Linear' );
let b = Twixt.create( 100, 'InOutQuint' );
```
From there, you can tween to any value by using .to():
```js
// a goes to 1 in 100ms in a Linear tween
a.to( 1, 100 );

// b goes to 0 in 500ms using InOutQuint tween after a delay of 100ms
b.to( 0, 500, 'InOutQuint', 100 )
```
Twixt values' `.to()` method returns a promise, so you can chain events or do something when the tween is completed:
```js
a.to( 0, 100 ).then( () => {
    b.to( 100, 200 ).then( () => {
        console.log( 'done!' );
    });
});
```
You can delete tweened values by calling `Twixt.destroy`:
```
Twixt.destroy( a );
```
#### Auto updated
Twixt will autoupdate using its own `window.requestAnimationFrame` unless you specify `Twixt.autoUpdate = false;`. In that case, you have to update it manually by calling `Twixt.update();` from inside your animation loop.
#### Available tweening equations
There's only Linear, and In, Out and InOutQuint for now
#### License ####

Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
