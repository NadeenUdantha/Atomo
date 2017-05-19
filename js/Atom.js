
geometry.nucleus = new THREE.SphereGeometry(1, 50, 50);
geometry.electron = new THREE.SphereGeometry(0.2, 25, 25);
cover = {};
cover.nucleus = new THREE.MeshPhongMaterial({color:0xff0000});
cover.electron = new THREE.MeshPhongMaterial({color:0x0000ff});
/*
obj = new THREE.Object3D();

    geometry = new THREE.SphereGeometry(1,50,50);
    material = new THREE.MeshPhongMaterial();
    mesh = new THREE.Mesh(geometry,material);
    mesh.material.color.setRGB(255,0,0);
    material.reflectivity = 1.0;
    obj.add(mesh);
    
    geometry = new THREE.SphereGeometry(0.2,25,25);
    material = new THREE.MeshPhongMaterial();
    mesh1 = new THREE.Mesh(geometry,material);
    mesh1.material.color.setRGB(255,0,255);
    obj.add(mesh1);
    mesh2 = new THREE.Mesh(geometry,material);
    mesh2.material.color.setRGB(255,0,255);
    obj.add(mesh2);
    
    geometry = new THREE.TorusGeometry(2,0.05,16,100);
    material = new THREE.MeshNormalMaterial({color:0x808080});
    material.reflectivity = 1.0;
    torus = new THREE.Mesh(geometry,material);
    //torus.rotation.set(0,Math.PI/2,0);
    obj.add(torus);

    scene.add(obj);

    light = new THREE.HemisphereLight(0xaaaaaa,0x777777,100);
    scene.add(light);

    lights = new THREE.Object3D();

    light1 = new THREE.RectAreaLight( 0xFFFFFF,1,0.001,0.001);		
    light1.matrixAutoUpdate = true;
    light1.position.set(0.7,0,3);
    light1.rotation.x = Math.PI;
    light1.intensity = 0.05;
    light1.shadow = 0;
    light1.target = obj;
    lights.add(light1);
    
    light2 = new THREE.RectAreaLight( 0xFFFFFF,1, 0.1, 0.1 );				
    light2.matrixAutoUpdate = true; 
    light2.position.set(-15,35,-10);
    light2.intensity = 30;
    light2.shadow = 0;
    light2.target = obj;
    lights.add(light2); 
    
    light3 = new THREE.RectAreaLight( 0xFFFFFF, 1, 0.1, 0.1);				
    light3.matrixAutoUpdate = true; 
    light3.position.set(15,-35,-10);
    light3.intensity = 30;
    light3.shadow = 0;
    light3.target = obj;
    lights.add(light3);
    scene.add(lights);
*/
function onClick(obj)
{
    var thisx = elements[this.x];
    atom_add(thisx.atom);
    thisx.sel++;
}
function Element(name, x, y, z) {
    var thisx = this;
    this.x = x;
    this.y = y;
    this.z = z;
    this.sel = 0;
    var btn = document.createElement("button");
    btn.innerText = name;
    this.name = name;
    btn.onclick = onClick;
    btn.x = z;
    
    var btn = document.createElement("div");
    btn.id = "ele";
    btn.innerText = name;
    btn.onclick = onClick;
    btn.x = z;

    var ti = table2[z];
    var num = document.createElement("div");
    num.className = "num";
    num.textContent = z+1;
    btn.appendChild(num);

    var sym = document.createElement("div");
    sym.className = "sym";
    sym.textContent = ti[0];
    btn.appendChild(sym);

    var inf = document.createElement("div");
    inf.className = "inf";
    inf.innerHTML = ti[1] + "<br>" + ti[2] + "<br>";
    btn.appendChild(inf);
    this.btn = btn;
    this.a = null;
    return this;
}
function cloneAtom(atom)
{
    var clone = new Atom(atom.element);
    init_atom(clone,true);
    return clone;
}
function atom_init() {    
    vertices = new THREE.TorusGeometry(2, 0.05, 16, 100).vertices;
    for (var x = 0; x < elements.length; x++) {
        var ele = elements[x];
        var atom = new Atom(ele);
        init_atom(atom,false);
        ele.atom = atom;
    }
}
function Atom(ele) {
    this.element = ele;
    this.nucleus = new Nucleus(ele);
    this.cz = null;
    this.electrons = [];
    this.obj = null;
    return this;
}
function createText(text) {
    var 
		height = .20,
		size = .70,
		hover = 0,
		curveSegments = .04,
		bevelThickness = .02,
		bevelSize = .015,
		bevelSegments = .03,
		bevelEnabled = true;

    var textGeo = new THREE.TextBufferGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled,
        material: 0,
        extrudeMaterial: 1

    });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    // "fix" side normals by removing z-component of normals for side faces
    // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

    if (!bevelEnabled) {

        var triangleAreaHeuristics = 0.1 * (height * size);

        for (var i = 0; i < textGeo.faces.length; i++) {

            var face = textGeo.faces[i];

            if (face.materialIndex == 1) {

                for (var j = 0; j < face.vertexNormals.length; j++) {

                    face.vertexNormals[j].z = 0;
                    face.vertexNormals[j].normalize();

                }

                var va = textGeo.vertices[face.a];
                var vb = textGeo.vertices[face.b];
                var vc = textGeo.vertices[face.c];

                var s = THREE.GeometryUtils.triangleArea(va, vb, vc);

                if (s > triangleAreaHeuristics) {

                    for (var j = 0; j < face.vertexNormals.length; j++) {

                        face.vertexNormals[j].copy(face.normal);

                    }

                }

            }

        }

    }

    var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    var textMesh = new THREE.Mesh(textGeo);

    textMesh.position.x = centerOffset;
    textMesh.position.y = hover-0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);
    textMesh.position.z = 1;

    textMesh.rotation.x = 0;
    textMesh.rotation.y = Math.PI * 2;
    return textMesh;
}
function init_atom(atom,clone)
{
    var obj = new THREE.Object3D();
    var ez = new THREE.Object3D();
    var z = atom.element.z+1;
    var zz = 0;
    var zxz = 0;
    for(var x = 0;x < 4;x++)
    {
        var a = czlist[x];
        zxz = x;
        var y = z-a;
        if(y <= 0)
        {
            zz = x-1;
            break;
        }
        z -= a;
    }
    atom.zz = z;
    //console.log(z);
    //if(1)return;
    var czx = new Cz();
    czx.index = zxz;
    var material = new THREE.MeshNormalMaterial();
    material.reflectivity = 1.0;
    var cz = new THREE.TorusGeometry(2, 0.0125, 16, 100);
    var mesh = new THREE.Mesh(cz, material);
    //torus.rotation.set(0,Math.PI/2,0);
    ez.add(mesh);
    czx.mesh = mesh;
    atom.cz = czx;
    var vs = 100;
    for (var x = 0; x < z; x++) {
        var ex = new Electron();
        ex.atom = atom;
        ex.zzz = Math.round(vs/z*x);
        var pos = vertices[Math.round(vs / z * x)];
        ex.mesh.position.copy(pos);
        /*if(clone)
        {
            console.log(pos);
            console.log(ex.mesh.position);
            console.log(vs); 
            console.log(z);
            console.log(x);
            console.log(vs/z);
            console.log(vs/z*x);
            console.log(ex.zzz);
        }*/
        //var rot = (z/ czlist[zz]) * Math.PI * 2;
        //if (czindex == 0) {
            //ex.rotx = rot;
            //ex.roty = rot;
            //ex.rotz = 0;
        /*} else if (czindex == 1) {
            ex.rotx = 0;
            ex.roty = 0;
            ex.rotz = 0;
        }*/
        ez.add(ex.mesh);
        atom.electrons.push(ex);
        czx.ecount++;
    }
    obj.add(atom.nucleus.mesh);
    ez.add(atom.cz.mesh);
    obj.add(ez);
    atom.text = createText(atom.element.name);
    obj.add(atom.text);
    atom.obj = obj;
    
    var obj2 = atom.nucleus.mesh;
    var light1 = new THREE.RectAreaLight(0xFFFFFF, 1, 0.001, 0.001);
    light1.matrixAutoUpdate = true;
    light1.position.set(0.7, 0, 3);
    light1.rotation.x = Math.PI;
    light1.intensity = 15;
    light1.shadow = 0;
    light1.target = obj2;
    atom.light1 = light1;

    var light2 = new THREE.RectAreaLight(0xFFFFFF, 1, 0.1, 0.1);
    light2.matrixAutoUpdate = true;
    light2.position.set(-1.5, 3.5, -1.0);
    light2.intensity = 50;
    light2.shadow = 0;
    light2.target = obj2;
    atom.light2 = light2;

    var light3 = new THREE.RectAreaLight(0xFFFFFF, 1, 0.1, 0.1);
    light3.matrixAutoUpdate = true;
    light3.position.set(1.5, -3.5, -1.0);
    light3.intensity = 50;
    light3.shadow = 0;
    light3.target = obj2;
    atom.light3 = light3;
    obj.add(light1);
    obj.add(light2);
    obj.add(light3);
    atom.lights = obj;
    /*var obj2 = atom.nucleus;
    var lights = new THREE.Object3D();
    var light1 = new THREE.RectAreaLight(0xFFFFFF, 1, 0.001, 0.001);
    light1.matrixAutoUpdate = true;
    light1.position.set(0.7, 0, 3);
    light1.rotation.x = Math.PI;
    light1.intensity = 0.05;
    light1.shadow = 0;
    light1.target = obj2;
    atom.light1 = light1;
    //lights.add(light1);

    var light2 = new THREE.RectAreaLight(0xFFFFFF, 1, 0.1, 0.1);
    light2.matrixAutoUpdate = true;
    light2.position.set(-15, 35, -10);
    light2.intensity = 30;
    light2.shadow = 0;
    light2.target = obj2;
    atom.light2 = light2;
    // lights.add(light2);

    var light3 = new THREE.RectAreaLight(0xFFFFFF, 1, 0.1, 0.1);
    light3.matrixAutoUpdate = true;
    light3.position.set(15, -35, -10);
    light3.intensity = 30;
    light3.shadow = 0;
    light3.target = obj2;
    atom.light3 = light3;
    //lights.add(light3);
    //atom.lights = lights;*/
}
function Nucleus(element) {
    //console.log(geometry.nucleus);
    this.mesh = new THREE.Mesh(geometry.nucleus, cover.nucleus);
    this.mesh.material.reflectivity = 1.0;
    this.element = element;
    return this;
}
function Cz() {
    this.index = 0;
    this.ecount = 0;
    return this;
}
function Electron() {
    this.mesh = new THREE.Mesh(geometry.electron, cover.electron);
    this.zzz = 0;
    this.b = false;
    return this;
}
