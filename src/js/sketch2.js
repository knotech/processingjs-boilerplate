WebFont.load({
	google: {
		families: ['Maven Pro', 'Raleway', 'Abel']
	}
});

function setup() {
	createCanvas(window.innerWidth, 60).parent('headline');
}

function draw() {
	background(0,0,0);
	fill(0);
	sphere(12,12,12);
}