var scene, camera, renderer, stats, controls;
//var geometry, material;
//var mesh, light, torus, mesh1, mesh2;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 10);

    mainLight = new THREE.HemisphereLight(0xaaaaaa, 0x777777, 100);
    //scene.add(mainLight);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setClearColor(0x0a0808,1);
    //renderer.setClearColor(0xffffff,1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    stats = new Stats();
    document.body.appendChild(stats.dom);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener('change',render);
    controls.enableZoom = false;
}
//var clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}
var pos = 0, pos2 = 0, x = 0.0;
function draw() {
    if(atoms.length == 1)
    {
        var atom = atoms[x];
        rot(atom);
    }
    /*else if(atoms.length == 2)
    {
        
    }*/
}
function Reset() {
    while (atoms.length != 0)
    {
        var atom = atoms.pop();
        scene.remove(atom.obj);
        //while (atom.electrons.length != 0)
            //scene.add(atom.electrons.pop().mesh);
    }
    clearInfo();
    updateInfo();
}
function rot(atom)
{
    for (var y = 0; y < atom.electrons.length; y++) {
            var xx = atom.electrons[y];
            var e = xx.mesh;
            var vs = vertices;
            //console.log(xx.zzz);
            //console.log(vs[xx.zzz]);
            var t = vs[Math.round(xx.zzz)];
            e.position.copy(t);
            xx.zzz += 1;
            if(xx.zzz >= 100)
                xx.zzz = 0;
            //e.position.x = Math.sin(t)*2;
            //e.position.y = Math.sin(t)*2;
            //e.position.z = Math.cos(t)*2;
    }
}
function pos1(atom)
{
    atom.obj.position.set(0, 0, 0);
}
function pos21(cb,atom1,atom2)
{
    var e1 = cb.e2s[0][0];
    var e2 = cb.e2s[0][1];
    e2.mesh.position.copy(vertices[50]);
    e1.mesh.position.copy(vertices[0]);
    var mesh = new THREE.Mesh(geometry.electron);
    var mat = mesh.material;
    e1.mesh.material = mat;
    e2.mesh.material = mat;
    /*for (var x = 0; x < atom1.electrons.length; )
        atom1.electrons[x].mesh.material = mat;*/
    cb.move();
}
function pos22(cb){
    var e11 = cb.e2s[0][0];
    var e12 = cb.e2s[0][1];
    var e21 = cb.e2s[1][0];
    var e22 = cb.e2s[1][1];
    e11.mesh.position.copy(vertices[3]);
    e12.mesh.position.copy(vertices[53]);
    e21.mesh.position.copy(vertices[97]);
    e22.mesh.position.copy(vertices[47]);
    var mesh = new THREE.Mesh(geometry.electron);
    var mat = mesh.material;
    e11.mesh.material = mat;
    e21.mesh.material = mat;
    mesh = new THREE.Mesh(geometry.electron);
    mat = mesh.material;
    e12.mesh.material = mat;
    e22.mesh.material = mat;
    cb.move();
}
function pos23(cb){
    var e11 = cb.e2s[0][0];
    var e12 = cb.e2s[0][1];
    var e21 = cb.e2s[1][0];
    var e22 = cb.e2s[1][1];
    var e31 = cb.e2s[2][0];
    var e32 = cb.e2s[2][1];
    e11.mesh.position.copy(vertices[4]);
    e12.mesh.position.copy(vertices[54]);
    e21.mesh.position.copy(vertices[0]);
    e22.mesh.position.copy(vertices[50]);
    e31.mesh.position.copy(vertices[96]);
    e32.mesh.position.copy(vertices[46]);
    var mesh = new THREE.Mesh(geometry.electron);
    var mat = mesh.material;
    e11.mesh.material = mat;
    e21.mesh.material = mat;
    e31.mesh.material = mat;
    mesh = new THREE.Mesh(geometry.electron);
    mat = mesh.material;
    e12.mesh.material = mat;
    e22.mesh.material = mat;
    e32.mesh.material = mat;
    cb.move();
}
function atom_add(atom) {
    /*if(atoms.length > 2)
    {
        for(var x = 0;x < atoms.length;x++)
        {
            atom.obj.remove(atom.light1);
            atom.obj.remove(atom.light2);
            atom.obj.remove(atom.light3);
        }
        lightOff();
    }
    else
    {
        lightOn();
    }*/
    atom = cloneAtom(atom);
    atoms.push(atom);
    scene.add(atom.obj);
    clearInfo();
    updateInfo();
    //for(var x = 0;x < atom.electrons.length;x++)
        //scene.add(atom.electrons[x].mesh);
    for (var x = 0; x < atoms.length;x++)
        freeEs(atoms[x]);
        /*infName1 = atom.element.name;
        infType = btypes[cb.e2s.length]+" Bond";
        updateInfo();*/
    
    if (atoms.length == 1){
        pos1(atom);
        infName1 = atom.element.name;
        //infType = btypes[cb.e2s.length]+" Bond";
        updateInfo();
    }
    else if (atoms.length == 2) {
        //atoms = order(atoms);
        var atom1 = atoms[0];
        var atom2 = atoms[1];
        var cb = CB2(atom1,atom2);
        if(cb.x)
        {
            var dis = 1.9;
            atom1.obj.position.set(-dis, 0, 0);
            atom2.obj.position.set(dis, 0, 0);
            rot(atom1);
            rot(atom2);
            if(cb.e2s.length == 1)
                pos21(cb);
            else if(cb.e2s.length == 2)
                pos22(cb);
            else if(cb.e2s.length == 3)
                pos23(cb);
            if(atom1.element.name == atom2.element.name)
                infName1 = atom1.element.name+"<sub>2</sub>";
            else
                infName1 = atom1.element.name+atom2.element.name;
            updateInfo();
            var aa = btypes[cb.e2s.length - 1];
            if (aa != undefined) {
                infType = "<br><span class=\"ibtype\">" + aa + " Bond</span>";
                updateInfo();
            }
        }
        else
        {
            var dis = 1.9*2;
            if (atom1.element.y == 7 || atom2.element.y == 7)
                dis = 2.1 * 2;
            atom1.obj.position.set(-dis, 0, 0);
            atom2.obj.position.set(dis, 0, 0);
        }
    }
    else if (atoms.length == 3) {
        var atom1 = atoms[0];
        var atom2 = atoms[1];
        var atom3 = atoms[2];
        var cb1 = CB3(atom1,atom2,atom3);
        var cb2 = CB3(atom2,atom1,atom3);
        var cb3 = CB3(atom3,atom2,atom1);
        //console.log(cb1,cb2,cb3);
        var main = null;
        var cb = null;
        if (cb1.x) {
            cb = cb1;
            main = atom1;
            atom1 = atom2;
            atom2 = atom3;
        }
        else if (cb2.x) {
            cb = cb2;
            main = atom2;
            atom1 = atom1;
            atom2 = atom3;
        }
        else if (cb3.x) {
            cb = cb3;
            main = atom3;
            atom1 = atom1;
            atom2 = atom2;
        }
        if(main != null && cb != null)
        {
            var dis = 1.9*2;
            atom1.obj.position.set(-dis, 0, 0);
            main.obj.position.set(0, 0, 0);
            atom2.obj.position.set(dis, 0, 0);
            cb.cbx1.move2(atom1,0);
            cb.cbx2.move2(atom2,1);
            //rot(atom1);
            //rot(atom2);
            var len = cb.cbx1.e2s.length+cb.cbx1.e2s.length;
            //console.log(len);
            if(len == 1)
            {
                var e1 = cb.e2s[0][0];
                var e2 = cb.e2s[0][1];
                e2.mesh.position.copy(vertices[50]);
                e1.mesh.position.copy(vertices[0]);
                var mesh = new THREE.Mesh(geometry.electron);
                var mat = mesh.material;
                e1.mesh.material = mat;
                e2.mesh.material = mat;
                cb.move();
            }
            return;
            if(cb.e2s.length == 4)
            {
                var e11 = cb.e2s[0][0];
                var e12 = cb.e2s[0][1];
                var e21 = cb.e2s[1][0];
                var e22 = cb.e2s[1][1];
                e11.mesh.position.copy(vertices[3]);
                e12.mesh.position.copy(vertices[53]);
                e21.mesh.position.copy(vertices[97]);
                e22.mesh.position.copy(vertices[47]);
                var mesh = new THREE.Mesh(geometry.electron);
                var mat = mesh.material;
                e11.mesh.material = mat;
                e21.mesh.material = mat;
                mesh = new THREE.Mesh(geometry.electron);
                mat = mesh.material;
                e12.mesh.material = mat;
                e22.mesh.material = mat;
                cb.move();
            }
            else if(cb.e2s.length == 6)
            {
                var e11 = cb.e2s[0][0];
                var e12 = cb.e2s[0][1];
                var e21 = cb.e2s[1][0];
                var e22 = cb.e2s[1][1];
                var e31 = cb.e2s[2][0];
                var e32 = cb.e2s[2][1];
                e11.mesh.position.copy(vertices[4]);
                e12.mesh.position.copy(vertices[54]);
                e21.mesh.position.copy(vertices[0]);
                e22.mesh.position.copy(vertices[50]);
                e31.mesh.position.copy(vertices[96]);
                e32.mesh.position.copy(vertices[46]);
                var mesh = new THREE.Mesh(geometry.electron);
                var mat = mesh.material;
                e11.mesh.material = mat;
                e21.mesh.material = mat;
                e31.mesh.material = mat;
                mesh = new THREE.Mesh(geometry.electron);
                mat = mesh.material;
                e12.mesh.material = mat;
                e22.mesh.material = mat;
                e32.mesh.material = mat;
                cb.move();
            }
        }
        else
        {
            var dis = 2.1*2;
            atom1.obj.position.set(-dis, 0, 0);
            atom2.obj.position.set(0, 0, 0);
            atom3.obj.position.set(dis, 0, 0);
        }
    }
    //scene.add(atom.light1);
    //scene.add(atom.light2);
    //scene.add(atom.light3);
}
function render() {
    stats.update();
    //var t = clock.getElapsedTime();
    draw();
    /*
   //obj.rotation.x = t;
   obj.rotation.x = x;
   x += 0.01;
   if(obj.rotation.x > 360)
        obj.rotation.x = 0;
   obj.rotation.y = x;*/
    //lights.rotation.copy(obj.rotation);

    /*mesh1.position.x = Math.sin(t)*2;
    mesh1.position.y = Math.cos(t)*2;
    mesh1.position.z = Math.cos(t)*2;*/

    /*mesh1.position.copy(torus.geometry.vertices[pos]);pos += 1; if(torus.geometry.vertices.length <= pos)
            pos = 0;
    
    mesh2.position.copy(torus.geometry.vertices[pos2]);pos2 += 1; if(torus.geometry.vertices.length <= pos2)
            pos2 = 0;
        */
    renderer.render(scene, camera);
}















