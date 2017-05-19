


/*function zzzzz(atom)
{
    return atom.element.y == 7;
}*/

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function sortAlphaNum(a,b) {
    a = a.element.name;
    b = b.element.name;
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if(aA === bA) {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
}

function order(atoms)
{
    return atoms.sort(sortAlphaNum);
}

function CB2(atom1,atom2)
{
    /*if(zzzzz(atom1) || zzzzz(atom2))
        return {x:false};*/
    var val1 = atom1.cz.ecount;
    var val2 = atom2.cz.ecount;
    var max1 = czlist[atom1.cz.index];
    var max2 = czlist[atom2.cz.index];
    //console.log(atom1,atom2,max1,max2,val1,val2);
    var as = [];
    for (var x = 0; x <= val1;x++)
    {
        var a1 = val1 + x;
        var a2 = val2 + x;
        //console.log(a1,a2,x);
        if(a2 == max2)
            as.push(a1);
        if(a1 == max1 && a2 == max2)
        {
            //console.log(x);
            var e2s = [];
            for(var y = 0;y < x;y++)
            {
                var z = [];
                z.push(atom1.electrons[y]);
                atom1.electrons[y].b = true;
                z.push(atom2.electrons[y]);
                atom2.electrons[y].b = true;
                e2s.push(z);
            }
            var move3 = function (e1, e2, value, add) {
                var a = 0;
                if (add == 1)
                    a = 50;
                e1.mesh.position.copy(vertices[value + 3 + a]);
                e2.mesh.position.copy(vertices[value - 3 + a]);
            };
            var move2 = function (atom, add) {
                //console.log(atom1,atom2);
                var es = [];
                for (var y = 0; y < atom.electrons.length; y++) {
                    var e = atom.electrons[y];
                    if (!e.b)
                        es.push(e);
                }
                //console.log(x);
                //if (x == 0)
                {
                    //if (max1 == 8 && max2 == 8)
                    {
                        //console.log(es);
                        if (es.length % 2 == 0) {
                            switch (es.length / 2) {
                                case 1:
                                    {
                                        move3(es[0], es[1], 50, add);
                                        break;
                                    }
                                case 2:
                                    {
                                        move3(es[0], es[1], 25, add);
                                        move3(es[2], es[3], 75, add);
                                        break;
                                    }
                                case 3:
                                    {
                                        move3(es[0], es[1], 25, add);
                                        move3(es[2], es[3], 50, add);
                                        move3(es[4], es[5], 75, add);
                                        break;
                                    }
                            }
                        }
                    }
                }
            };
            var move = function()
            {
                move2(atom1,0);
                move2(atom2,1);
            };
            return {x:true,e2s:e2s,move:move};
        }
    }
    return {x:false,as:as};
}
function CB2X(atom1,atom2)
{
    var val1 = atom1.cz.ecount;
    var val2 = atom2.cz.ecount;
    var max1 = czlist[atom1.cz.index];
    var max2 = czlist[atom2.cz.index];
    //console.log(atom1,atom2,max1,max2,val1,val2);
    for (var x = 0; x <= val1;x++)
    {
        var a1 = val1 + x;
        var a2 = val2 + x;
        //console.log(a1,a2,x);
        if(a2 == max2)
        {
            //console.log(x);
            var e2s = [];
            var z = 0;
            for (var y = 0; y < atom1.electrons.length; y++)
                if (!atom1.electrons[y].b) {
                    z = y;
                    break;
                }
            console.log(z)
            for(var y = z;y < x;y++)
            {
                var z = [];
                z.push(atom1.electrons[y]);
                atom1.electrons[y].b = true;
                z.push(atom2.electrons[y]);
                atom2.electrons[y].b = true;
                e2s.push(z);
            }
            var move3 = function (e1, e2, value, add) {
                var a = 0;
                if (add == 1)
                    a = 50;
                e1.mesh.position.copy(vertices[value + 3 + a]);
                e2.mesh.position.copy(vertices[value - 3 + a]);
            };
            var move2 = function (atom, add) {
                //console.log(atom1,atom2);
                var es = [];
                for (var y = 0; y < atom.electrons.length; y++) {
                    var e = atom.electrons[y];
                    if (!e.b)
                        es.push(e);
                }
                //console.log(es);
                //console.log(x);
                //if (x == 0)
                {
                    //if (max1 == 8 && max2 == 8)
                    {
                        //console.log(es);
                        if (es.length % 2 == 0) {
                            switch (es.length / 2) {
                                case 1:
                                    {
                                        move3(es[0], es[1], 50, add);
                                        break;
                                    }
                                case 2:
                                    {
                                        move3(es[0], es[1], 25, add);
                                        move3(es[2], es[3], 75, add);
                                        break;
                                    }
                                case 3:
                                    {
                                        move3(es[0], es[1], 25, add);
                                        move3(es[2], es[3], 50, add);
                                        move3(es[4], es[5], 75, add);
                                        break;
                                    }
                            }
                        }
                    }
                }
            };
            /*var move = function()
            {
                move2(atom1,0);
                move2(atom2,1);
            };*/
            return {x:true,e2s:e2s,/*move:move,*/move2:move2,move3:move3};
        }
    }
    return {x:false};
}
function CB3(main,atom1,atom2)
{
    var cb1 = CB2(main,atom1);
    var cb2 = CB2(main,atom2);
    if(!cb1.x && !cb1.x)
    {
        var a = null;
        for (var x = 0; x < cb1.as.length;x++)
        {
            for (var y = 0; y < cb2.as.length;y++)
                //console.log(cb1.as[x],cb2.as[y]);
                if(cb1.as[x] == cb2.as[y])
                {
                    a = cb1.as[x];
                    break;
                }
        }
        if (a != null)
        {
            var cbx1 = CB2X(main,atom1);
            var cbx2 = CB2X(main,atom2);
            //console.log(cbx1,cbx2);
            //main.obj.position.set(0, 0, 0);
            //cbx1.move2(main,0);
            //cbx1.move2(atom1,0);
            //cbx2.move2(atom2,1);
            //var dis = 1.9*2;
            //atom1.obj.position.set(-dis, 0, 0);
            //atom2.obj.position.set(dis, 0, 0);
            return {x:true,cbx1:cbx1,cbx2:cbx2}; 
        }
    }
    return {x:false};
}
function freeEs(atom)
{
    for (var x = 0; x < atom.electrons.length; x++)
        atom.electrons[x].b = false;
}










