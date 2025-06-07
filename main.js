



// Elements
let y_stick = document.getElementById('y_control').getElementsByClassName('handle')[0];
let x_stick = document.getElementById('x_control').getElementsByClassName('handle')[0];
let numpad = document.getElementById('numpad')
let showcode_screen = document.getElementById('showcode')
let missile_launch = document.getElementById('missile-launch')


// Element Constants
y_stick.style.top = "128px"
x_stick.style.left = "128px"
numpad.style.display = 'none'


// Global Variables
let joystick = {
	x: 0,
	y: 0
}

let touchObjects = {
	x: null,
	y: null
}

let isFollowingY = false
let isFollowingX = false
let missileIsOn = false

let password = '6942'
let currentCodeIndex = 0















// Functions
function updateY(deltaY, isTouch=false) {
	// Localize Delta
	if (isTouch) {
		let box = y_stick.getBoundingClientRect()
		deltaY -= Math.floor(box.y+box.height*0.5)
	}

	// Regular Method
	if (Math.abs(joystick.y - deltaY) < 255) {
		// Update Joystick Value
		joystick.y -= deltaY*2

		// Update HTML
		let offset = parseInt(y_stick.style.top.substring(0, y_stick.style.top.length-2)) + deltaY
		y_stick.style.top = `${offset}px`
	}

	//  Overflow
	else {
		if 		(deltaY<0) {
			joystick.y = 255
			y_stick.style.top = "0px"
		}
		else if (deltaY>0) {
			joystick.y = -255
			y_stick.style.top = "255px"
		}
	}
}

function updateX(deltaX, isTouch=false) {
	// Localize Delta
	if (isTouch) {
		let box = x_stick.getBoundingClientRect()
		deltaX -= Math.floor(box.x+box.width*0.5)
	}
	
	// Regular Method
	if (Math.abs(joystick.x + deltaX) < 255) {
		// Update Joystick Value
		joystick.x += deltaX*2

		// Update HTML
		let offset = parseInt(x_stick.style.left.substring(0, x_stick.style.left.length-2)) + deltaX
		x_stick.style.left = `${offset}px`
	}

	//  Overflow
	else {
		if 		(deltaX>0) {
			joystick.x = 255
			x_stick.style.left = "255px"
		}
		else if (deltaX<0) {
			joystick.x = -255
			x_stick.style.left = "0px"
		}
	}
}


















// Event Listeners
	// Mouse Events

		// Start Y
document.getElementById('y_control').addEventListener('mousedown', e => {
	isFollowingY = true
})
		// Start X
document.getElementById('x_control').addEventListener('mousedown', e => {
	isFollowingX = true
})
		// End
document.addEventListener('mouseup', e => {
	isFollowingY = false
	isFollowingX = false
})
		// Move
document.addEventListener('mousemove', e => {
	if (isFollowingY) updateY(e.movementY)
	if (isFollowingX) updateX(e.movementX)
})

// -----------------------------------------------------------------------

	// Touch Events
		//  Start Y
document.getElementById('y_control').addEventListener('touchstart', e => {
	isFollowingY = true
	touchObjects.y = e.changedTouches[0]
	updateY(Math.floor(touchObjects.y.clientY), true)
})
		// Start X
document.getElementById('x_control').addEventListener('touchstart', e => {
	isFollowingX = true
	touchObjects.x = e.changedTouches[0]
	updateX(Math.floor(touchObjects.x.clientX), true)
})
		//  End
document.addEventListener('touchend', e => {
	for (let i=0; i<e.changedTouches.length; i++) {
		if (isFollowingY) {
			if (e.changedTouches[i].identifier == touchObjects.y.identifier) {
				isFollowingY = false
				touchObjects.y = null
				updateY(Math.ceil(joystick.y*0.5))
			}	
		}
		
		if (isFollowingX) {
			if (e.changedTouches[i].identifier == touchObjects.x.identifier) {
				isFollowingX = false
				touchObjects.x = null
				updateX(Math.ceil(-joystick.x*0.5))
			}	
		}
	}
})
		//  Move
document.addEventListener('touchmove', e => {
	for (let i=0; i<e.changedTouches.length; i++) {
		if (isFollowingY && e.changedTouches[i].identifier == touchObjects.y.identifier) updateY(Math.floor(e.changedTouches[i].clientY), true)
		if (isFollowingX && e.changedTouches[i].identifier == touchObjects.x.identifier) updateX(Math.floor(e.changedTouches[i].clientX), true)
	}
})

// -----------------------------------------------------------------------

	// Buttons
		// Click Missile Prep
document.getElementById('missile-prep').addEventListener('click', e => {
	if (missileIsOn) {
		missile_launch.style.display = "none"
		missileIsOn = false
	}
	else {
		numpad.style.display = 'grid'
	}
})
		//  Click Missile Launch
missile_launch.addEventListener('click', e => {
	missile_launch.style.display = "none" 
	missileIsOn = false
})
		//  Click OK on Numpad
document.getElementById('accept-numpad').addEventListener('click', e => {
	numpad.style.display = 'none'

	// Check Password
	if (password == showcode_screen.getElementsByTagName('div')[0].innerHTML + showcode_screen.getElementsByTagName('div')[1].innerHTML + showcode_screen.getElementsByTagName('div')[2].innerHTML + showcode_screen.getElementsByTagName('div')[3].innerHTML) {
		missileIsOn = true
		missile_launch.style.display = "block"
	}
	else missileIsOn = false

	// Reset
	for (let i=0; i<4; i++) {
		showcode_screen.getElementsByTagName('div')[i].innerHTML = '_'
	}
	currentCodeIndex = 0;
})

		// Numpad Buttons
for (let i=1; i<10; i++) {
	numpad.getElementsByTagName('div')[i+5].addEventListener('click', e => {
		
		if (currentCodeIndex < 4) {
			// Print Number
			showcode_screen.getElementsByTagName('div')[currentCodeIndex].innerHTML = i	
			// Increment
			currentCodeIndex++
		}
	})
}

// -----------------------------------------------------------------------

	// Initiator
document.getElementById('initiator').addEventListener('click', e => {
		// Hide
	document.getElementById('initiator').style.display = 'none'

		// Lock Orientation
	document.getElementsByTagName('body')[0].requestFullscreen()
	screen.orientation.lock("landscape-primary")
})
