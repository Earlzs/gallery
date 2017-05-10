<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>three.js canvas - particles - waves</title>
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

<style>
body{background-color: #000000;margin: 0px;overflow: hidden;}
a{color:#0078ff;}
</style>

</head>
<body>

<script type="text/javascript" src="js/thres.js"></script>
<script type="text/javascript">

//粒子间距
var SEPARATION = 100, 
//控制横向的粒子数量
AMOUNTX = 30, 
// 控制纵向的粒子数量
AMOUNTY = 30;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth-300;
console.log(windowHalfX)
var windowHalfY = window.innerHeight-300;
console.log(windowHalfX)
init();		
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();

	particles = new Array();

	var PI2 = Math.PI * 2;
	var material = new THREE.ParticleCanvasMaterial( {

		color:700700,                         //111111111是紫色  //000700蓝色
		program: function ( context ) {

			context.beginPath(); 
			context.arc( 0, 0, 1, 0, PI2, true );  //控制球的半径
			context.fill();

		}

	} );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i ++ ] = new THREE.Particle( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );

		}

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	//鼠标移动视角交互
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}
//浏览器窗口变化
function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}

}

//

function animate() {

	requestAnimationFrame( animate );

	render();


}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

		}

	}

	renderer.render( scene, camera );

	count += 0.1;

}
</script>

</body>
</html>