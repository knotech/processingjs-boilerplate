var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var geometry2 = new THREE.BoxGeometry( 2, 2, 2 );
var geometry3 = new THREE.BoxGeometry( 3, 3, 3 );
var geometry4 = new THREE.SphereGeometry(5, 60, 60);

var material = new THREE.MeshLambertMaterial( {
	linewidth: 1,
	dashSize: 1,
	wireframe: true,
	color: 0x000000,
	// linewidth: 0.1,
	vertexColors: 0xadfe98
});

var material2 = new THREE.MeshLambertMaterial( {
	wireframe: true,
	// linewidth: 0.1,
	opacity: 0.3333,
	vertexColors: 0xadfe98,
	color: 0x000000
});

var basicMat = new THREE.MeshDepthMaterial({
	color: 0x000000,
	transparent: true

});

var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh(geometry2, material);
var cube3 = new THREE.Mesh(geometry3, material);
var sphere = new THREE.Mesh(geometry4, material2);

scene.add(cube);
scene.add(cube2);
scene.add(cube3);
scene.add(sphere);

camera.position.z = 10;
var cameraIncrement = 0;

var render = function() {
	requestAnimationFrame( render );

	
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.005;
	cube.rotation.z += 0.005;

	cube2.rotation.x += 0.005;
	cube2.rotation.y += 0.01;
	cube.rotation.z += 0.005;

	cube3.rotation.x += 0.005;
	cube3.rotation.y += 0.005;
	cube3.rotation.z += 0.01;

	sphere.rotation.z += 0.01;
	// if(camera.position.z < 1 || camera.position.z > 10) {
	// 	cameraZIncrement *= -1;
	// }
	// if(camera.position.z > 10) {
	// 	cameraZIncrement = 0;
	// }
	// console.log(cameraZIncrement);
	// console.log(camera.position.z)
	camera.position.x = Math.sin(cameraIncrement);
	camera.position.y = Math.cos(cameraIncrement);
	cameraIncrement += 0.01;
	// camera.position.x += Math.abs(cameraZIncrement*0.13);
	// camera.position.y += cameraZIncrement*0.75;
	renderer.render( scene, camera );
}

render();