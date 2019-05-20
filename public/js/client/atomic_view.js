const atomic_number = document.getElementById('container').dataset.atomic_number;

const viewAtomicStructure = function(atom) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var controls;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 1;
    controls.maxDistance = 8;

    var selectdAtom = new Atom(atom.atomic_number, atom.k_shell, atom.l_shell, atom.m_shell, atom.n_shell, atom.o_shell, atom.p_shell, atom.q_shell);

    var secondModel = selectdAtom.secondModel();

    var nucleus = secondModel.nucleus;
    var g = secondModel.group;

    scene.add(g);
    scene.add(nucleus);

    camera.position.z = 5;

    var animate = function () {
        g.rotation.z += 0.01;
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    };

    animate();
};

const atomRequestListener = function() {
    let response = JSON.parse(this.responseText);
    console.log(response.message);
    if (response.status == "success") {
        let atom = JSON.parse(response.data);
        viewAtomicStructure(atom);
    }
};


const atomRequest = new XMLHttpRequest();
atomRequest.onload = atomRequestListener
atomRequest.open('get', '/atoms/'+atomic_number);
atomRequest.send();