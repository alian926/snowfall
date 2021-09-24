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
		backgroundColor: 'rgba(255,255,255,.3)',
		padding: '20px',
	});
	initInput('sprite_scale', SPRITE_SCALE, div, (e) => {
		SPRITE_SCALE = getValidatedValue(e.target.value);
	});
	initInput('max_flakes', MAX_FLAKES, div, (e) => {
		MAX_FLAKES = getValidatedValue(e.target.value);
	});
	initInput('wind_scale', WIND_SCALE, div, (e) => {
		WIND_SCALE = getValidatedValue(e.target.value);
	});
	initInput('wind_density', WIND_DENSITY, div, (e) => {
		WIND_DENSITY = getValidatedValue(e.target.value);
	});
	initUpload('upload', div, (e) => {
		const obj = URL.createObjectURL(e.target.files[0]);
		clipImage(obj, width, height).then((img) => {
			_backgroundImage = img;
			_fillStyle = ctx.createPattern(img, 'no-repeat');
			background(_fillStyle);
			URL.revokeObjectURL(obj);
		});
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

function initUpload(name, parent, cb) {
	const input = document.createElement('input');
	input.id = name;
	input.type = 'file';
	input.addEventListener('change', cb);
	const label = document.createElement('label');
	label.innerText = name;
	label.setAttribute('for', name);
	parent.appendChild(label);
	parent.appendChild(input);
}

function getValidatedValue(_val) {
	const val = parseFloat(_val, 10);
	return val || 1;
}

function clipImage(url, width, height) {
	return new Promise((resolve, reject) => {
		try {
			loadImage(url).then((img) => {
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d');
				canvas.width = width;
				canvas.height = height;
				context.clearRect(0, 0, width, height);
				context.drawImage(
					img,
					0,
					0,
					img.width,
					img.height,
					0,
					0,
					width,
					height
				);
				const newUrl = canvas.toDataURL('image', 1);
				loadImage(newUrl).then(resolve);
			});
		} catch (err) {
			console.error('clip error', err);
			reject(err);
		}
	});
}
