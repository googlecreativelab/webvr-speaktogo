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
 * A very straightforward tweening library, with Promises
 */

((() => {

	/**
	 * Easing equations repository
	 * TO DO: Add as many methods as necessary
	 */

	const Easings = {

		Linear(t) { return t; },

		InQuint(t) { return t * t * t * t * t; },
		OutQuint(t) { return --t * t * t * t * t + 1; },
		InOutQuint(t) {
			if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
			return 0.5 * ((t -= 2) * t * t * t * t + 2);
		}

	};

	class Twixt {

		/**
		 * Create a Twixt object
		 */

		constructor() {

			this.count = 0;
			this.values = {}
			this.autoUpdate = true;

			this._update = this.update.bind( this );
			this._update();

		}

		/**
		 * Create a TwixtValue object
		 *
		 * @param {Number} value	the original value for the TwixtValue
		 * @param {String} easing	tweening equation (default is Linear)
		 */

		create( value, easing ) {

			const v = new TwixtValue( value, easing );
			v.id = this.count;
			this.count++;
			this.values[ v.id ] = v;
			return v;

		}

		/**
		 * Destroy a TwixtValue object
		 *
		 * @param {Object} v	the value to be destroyed
		 */

		destroy( v ) {

			if( this.values[ v.id ] ) {
				delete this.values[ v.id ];
			}

		}

		/**
		 * Updates all active TwixtValues
		 *
		 */

		update() {

			const time = performance.now();

			Object.keys( this.values ).forEach( v => {
				const value = this.values[ v ];
				this.updateValue( value, time );
			} );

			if( this.autoUpdate ) requestAnimationFrame( this._update );

		}

		/**
		 * Update a single TwixtValue
		 *
		 * @param {Object} value	the value to update
		 * @param {Number} time		the current time from the update tick
		 * @param {Number} delay 	delay value from the value
		 */

		updateValue( value, time, delay ) {

			let nValue;
			let reached = false;

			if( value.duration === 0 ) {

				nValue = value.target;
				reached = true;

			} else {

				const fn = value.easing;
				let t = time - value.startTime - value.delayTime;
				t /= value.duration;

				t = fn( t );

				if( t < 0 ) { nValue = value.origin; }
				else if( t >= 1 ) { nValue = value.target; reached = true; }
				else {
					nValue = value.origin + t * ( value.target - value.origin );
				}

			}

			value.value = nValue;
			if( reached && value.reached === false ) {
				value.reached = true;
				if( value.onReached ) {
					value.onReached();
					value.onReached = null;
				}
			}

		}
	}

	/**
	 * A TwixtValue than can be tweened
	 */

	class TwixtValue {


		/**
		 * Create a single TwixtValue
		 *
		 * @param {Object} value	original value
		 * @param {String} easing	easing method
		 */

		constructor(value, easing) {

			this.value = value || 0;
			this.origin = value || 0;
			this.target = value || 0;
			this.easing = easing ? Easings[ easing ] : Easings.Linear;
			this.startTime = 0;
			this.delayTime = 0;
			this.duration = 0;
			this.reached = false;

		}

		/**
		 * Tween to target value
		 *
		 * @param {Number} to			target value
		 * @param {Number} duration		tweening duration
		 * @param {String} easing		easing method
		 * @param {Number} delay		starting delay
		 */

		to(target, duration, easing, delay ) {

			this.origin = this.value;
			this.startTime = performance.now();
			this.delayTime = delay || 0;
			this.easing = Easings[ easing ] || this.easing;
			this.target = target;
			this.duration = duration || 0;
			this.reached = false;

			const value = this;

			return new Promise( ( resolve, reject ) => {
				value.onReached = resolve;
			});

		}

	}

	window.Twixt = new Twixt();

}))(window);
