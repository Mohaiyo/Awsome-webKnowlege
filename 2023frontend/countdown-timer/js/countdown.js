class CountDown {
	constructor(expiredDate, onRender, onComplete) {
		this.onRender = onRender
		this.onComplete = onComplete

		this.setExpiredDate(expiredDate)
	}
	setExpiredDate(expiredDate) {
		// get the current time
		const currentTime = new Date().getTime()
		// calculate the remaining time
		this.timeRemaining = expiredDate.getTime() - currentTime

		this.timeRemaining > 0 ? this.start() : this.complete()
	}
	complete() {
		if (typeof this.onComplete === 'function') {
			this.onComplete()
		}
	}

	start() {
		

		//  setup a timer
		const intervalId = setInterval(() => {
      this.update()
			// update the timer
			this.timeRemaining -= 1000

			if (this.timeRemaining < 0) {
				// call the callback
				complete()

				// clear the interval if expired
				clearInterval(intervalId)
			}
		}, 1000)
	}

	getTime() {
		return {
			days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
			hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
			minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
			seconds: Math.floor(this.timeRemaining / 1000) % 60,
		}
	}

	update() {
		if (typeof this.onRender === 'function') {
			this.onRender(this.getTime())
		}
	}
}
