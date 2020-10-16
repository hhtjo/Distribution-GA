const fs = require('fs')
const Population = require('./population')

let customers = ['Tom', 'Peder', 'Lars', 'Åge', 'Sjur', 'Simen', 'Anders', 'Kasper', 'Jesper', 'Jonathan']
let totals = [200, 150, 300, 175, 200, 125, 250, 175, 200, 150]
let products = ['Eple', 'Banan', 'Pære', 'Potet', 'Appelsin']
let prices = [30, 27, 33, 17, 44]
let toUse = [[15,50], [10,40], [40,20], [100,5], [20, 1]]

let mutationRate = 0.0007;
let generaitons = 10000;

let population = new Population(10, customers, products, totals, prices,toUse, mutationRate);

for(let i = 0; i < generaitons; i++){
    population.selection();
}

population.dnas.sort((a,b) => {
    return a.fitness() < b.fitness()
})
let result = population.dnas[0].genes;
let fitness = population.dnas[0].fitness();

let csv = "";
for(let i = 0; i < products.length; i++){
    for(let j = 0; j < customers.length; j++){
        csv += result[j][i];
        if(j !== customers.length - 1){
            csv += ',' 
        }
    }
    csv += '\n';
}
fs.writeFile('./result.csv', csv, (err) => {
})

console.log('Fitness: ', fitness)