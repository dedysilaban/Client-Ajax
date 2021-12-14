/*console.log('Running');*/

/*let array = [1, 2, 3, 4];
console.log(array);

*//*let arrayMultiDimensi = ['a', 'b', 'c', '1', '2', 'f'],true];
console.log(arrayMultiDimensi);*//*

*//*let element = null;
for (var i = o; i < array.length; i++) {
    element = array[i];
}
console.log(element);*//*

//adding last value to array
array.push('hello');
console.log(array);

//remove lat value
array.pop();
console.log(array);


array.shift();
console.log(array);
const testSplit = "Welcome back to jungle"
const [one, two, three] = testSplit.split(" ");
console.log(one);

//object
//array[] -> object{}

let student = {
    name : 'budi',
    nim : '123',
    gender : 'pria',
    age : 24,
    hobby : ['Football', 'Running'],
    isActive : true
}
console.log(student);

const user = {};
user.name = 'Reyna';
user.age = 15;
let key = 'age';
console.log(user['name']);

//lambda function / arrow function
function hitung(num1, num2,) {
    return num1 + num2;
}
const hitung2 = (num1, num2) => num1 + num2;
const hitung3 = (num1, num2 = 10) => {
    const jumlah = num1 + num2;
    return jumlah;
}

console.log(hitung(3, 5));
console.log(hitung2(5, 5));
console.log(hitung3(5));


const animals = [
    { name: 'fluffy', species: 'cat', class: { name: 'mamalia' } },
    { name: 'Nemo', species: 'fish', class: { name: 'vertebrata' } },
    { name: 'hely', species: 'cat', class: { name: 'mamalia' } },
    { name: 'Dory', species: 'fish', class: { name: 'vertebrata' } },
    { name: 'ursa', species: 'cat', class: { name: 'mamalia' } }
]
console.log(animals[2].class.name);


const OnlyCat = [];
for (let i = 0; i < animals.length; i++)
{
        if (animals[i].species == "cat") 
        {
            OnlyCat.push(animals[i]);
        }
        else if (animals[i].species == "fish")
        {
            animals[i].class.name = "Non Mamalia";
        } 
}
console.log(OnlyCat);
console.log(animals);*/

/*var text = "";
$.ajax({
    url: "https://swapi.dev/api/people"
}).done((result) => {
    console.log(result.results);
    $.each(result.results, function (key, val) {
        text += `<tr>
                    <td>${key+1}</td>
                    <td>${val.name}</td>
                    <td>${val.url}</td>
                    <td>${val.height}</td>
                    <td>${val.gender}</td>
                    <td>${val.skin_color}</td>
                </tr>`
    });
    $("#ListSW").html(text);
}).fail((error) => {
    console.log(error);
})*/
/*const onlyCat = [];
animals.forEach(aFungsi);
function aFungsi(item) {
    //tugas1
    if (item.species == "fish") {
        item.class.name = "non-mamalia";
    }
    //tugas2
    else if (item.species == "cat") {
        onlyCat.push(item);
    }
}
console.log(animals);
console.log(onlyCat);*/

// apabila species nya cat maka masuk ke array onlyCat
// jika species nya fish maka class nya berunbah menjadi non mamamlia

$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        console.log(result.results);
        var listPokemon = "";
        $.each(result.results, function (key, val) {
            listPokemon += `<tr>
                                <td>${key + 1}</td>
                                <td>${val.name}</td>
                                <td><button class="button btn-primary" onclick="launchModal('${val.url}')" data-toggle="modal" data-target="#PokemonModal">Klik</button></td>
                            </tr>`;
        });
        $('#tablePokemon').html(listPokemon);
    }
})

function launchModal(url) {
    console.log(url);
    listDetailPokemon = "";
    listAbil = "";
    listType = "";
    listStat = "";

    $.ajax({
        url: url,
        success: function (result) {
            let i = result.abilities;
            for (i = 0; i < result.abilities.length; i++) {
                listAbil += `<p>${result.abilities[i].ability.name}</p>`;
            }
            // types : grass, poison, fire, flying, water, bug, normal
            for (let i = 0; i < result.types.length; i++) {
                if (result.types[i].type.name == 'grass') {
                    listType += `
                    <span class="badge badge-success">Grass</span>`;
                }
                if (result.types[i].type.name == 'poison') {
                    listType += `
                    <span class="badge badge-info">Poison</span>`;
                }
                if (result.types[i].type.name == 'fire') {
                    listType += `
                    <span class="badge badge-danger">Fire</span>`;
                }
                if (result.types[i].type.name == 'flying') {
                    listType += `
                    <span class="badge badge-warning">Flying</span>`;
                }
                if (result.types[i].type.name == 'water') {
                    listType += `
                    <span class="badge badge-primary">Water</span>`;
                }
                if (result.types[i].type.name == 'bug') {
                    listType += `
                    <span class="badge badge-secondary">Bug</span>`;
                }
                if (result.types[i].type.name == 'normal') {
                    listType += `
                    <span class="badge badge-light">Normal</span>`;
                }
            }
            for (a = 0; a < result.stats.length; a++) {
                listStat += `<p>${result.stats[a].stat.name}: ${result.stats[a].base_stat}</p>`;
            }

            listDetailPokemon += `  <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src='${result.sprites.other["official-artwork"].front_default}' class="mx-auto d-block">
                                        <img src=''>
                                        <table class="table">
                                            <tr>
                                                <td class="font-weight-bold" style="font-family:'Courier New'">Type</td>
                                                <td>${listType}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-4 ml-auto">
                                        <p class = "h2" style="text-align:center; font-family:'verdana' " class="font-weight-bold"> Name: ${result.name}</p>
                                        <table class="table table-borderless table-success">
                                            <tr>
                                                <td class="font-weight-bold" style="font-family:'Courier New'" >Ability</td>
                                                <td>${listAbil}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold" style="font-family:'Courier New'">Stats</td>
                                                <td>${listStat}</td>
                                             </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                         `;
            $('.modal-body').html(listDetailPokemon);
        }
    })
}

/*$(document).ready(function () {
    $("#tablePokemon").DataTable({
        "ajax": {
            "url": "https://pokeapi.co/api/v2/pokemon/",
            "dataSrc": "results"
        },
        "columns": [
            {
                "data": "No"
            },
            {
                "data": "Name"
            },
            {
                "data": "",
                "render": function (data, type, row) {
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="getData('${row["url"]}')" data-bs-target="#PokemonModal">
                              Detail Pokemon
                            </button>`;
                }
            }
        ]
    });

});*/

