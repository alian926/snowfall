function setStyle(ele, options) {
	for (property in options) {
		if (property in ele.style) {
			ele.style[property] = options[property];
		}
	}
}

function initControls() {
	const div = document.createElement('div');
	document.body.appendChild(div);
	setStyle(div, {
		position: 'fixed',
		right: 0,
		top: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		width: '160px',
		backgroundColor: 'gray',
		padding: '20px',
	});
	initInput('sprite_scale', SPRITE_SCALE, div, (e) => {
		SPRITE_SCALE = e.target.value;
	});
	initInput('max_flakes', MAX_FLAKES, div, (e) => {
		MAX_FLAKES = e.target.value;
	});
	initInput('wind_scale', WIND_SCALE, div, (e) => {
		WIND_SCALE = e.target.value;
	});
	initInput('wind_density', WIND_DENSITY, div, (e) => {
		WIND_DENSITY = e.target.value;
	});
}

function initInput(name, defaultValue, parent, cb) {
	const input = document.createElement('input');
	input.id = name;
	input.type = 'number';
	input.value = defaultValue;
	setStyle(input, {
		marginBottom: '10px',
	});
	const label = document.createElement('label');
	label.innerText = name;
	label.setAttribute('for', name);
	parent.appendChild(label);
	parent.appendChild(input);
	input.addEventListener('change', cb);
}
