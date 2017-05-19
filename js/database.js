
table = [["H", null, null, null, null, null, null, "He"],
        ["Li", "Be", "B", "C", "N", "O", "F", "Ne"],
        ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"],
        ["K", "Ca", null, null, null, null, null, null]];
table2 = [["H", "Hydrogen", "1.00794", 1, 1],
                ["He", "Helium", "4.002602", 18, 1],
				["Li", "Lithium", "6.941", 1, 2],
				["Be", "Beryllium", "9.012182", 2, 2],
				["B", "Boron", "10.811", 13, 2],
				["C", "Carbon", "12.0107", 14, 2],
				["N", "Nitrogen", "14.0067", 15, 2],
				["O", "Oxygen", "15.9994", 16, 2],
				["F", "Fluorine", "18.9984032", 17, 2],
				["Ne", "Neon", "20.1797", 18, 2],
				["Na", "Sodium", "22.98976...", 1, 3],
				["Mg", "Magnesium", "24.305", 2, 3],
				["Al", "Aluminium", "26.9815386", 13, 3],
				["Si", "Silicon", "28.0855", 14, 3],
				["P", "Phosphorus", "30.973762", 15, 3],
				["S", "Sulfur", "32.065", 16, 3],
				["Cl", "Chlorine", "35.453", 17, 3],
				["Ar", "Argon", "39.948", 18, 3],
				["K", "Potassium", "39.948", 1, 4],
				["Ca", "Calcium", "40.078", 2, 4]];
czlist = [2, 8, 8, 8, 8];

function db_init() {
    var z = 0;
    for (var x = 0; x < table.length; x++) {
        var row = table[x];
        var tr = document.createElement("tr");
        //log(row);
        for (var y = 0; y < row.length; y++) {
            var en = row[y];
            var td = document.createElement("td");
            if (en != null) {
                var ele = new Element(en, x, y, z++);
                elements.push(ele);
                td.appendChild(ele.btn);
                /*td.style.border = "1px solid rgba(127,255,255,0.25)";
                td.style.width = "120px";
                td.style.height = "160px";
                td.style.boxShadow = "0px 0px 12px rgba(0,255,255,0.5)";
                td.style.border = "1px solid rgba(127,255,255,0.25)";
                td.style.textAlign = "center";*/
            } else {
                td.style.background = "transparent";
                td.style.cursor = "default";
            }
            tr.appendChild(td);
        }
        ttable.appendChild(tr);
    }
}