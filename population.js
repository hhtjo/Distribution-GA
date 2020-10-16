const DNA = require('./dna');

class Population{
    constructor(size, customers, products, totals, prices,toUse, mutationRate){
        this.dnas = new Array(size);
        this.mutationRate = mutationRate;

        for(let i = 0; i < size; i++){
            this.dnas[i] = new DNA(customers,products,totals,prices,toUse);
        }
    }
    selection(){
        let matingPool = [];
        this.dnas.sort((a,b)=> {
            return a.fitness() < b.fitness()
        })
        let fitnessOffset = this.dnas[this.dnas.length - 1].fitness();
        for(let i = 0; i < this.dnas.length; i++){
            let fitness = this.dnas[i].fitness();
            fitness -= fitnessOffset;
            let n = Math.pow(2, fitness/100)
//            let n = Math.pow(fitness/100, 5)
//            let n = Math.pow(2,Math.round(fitness/fitnessOffset))
            for(let j = 0; j < n ; j++){
                matingPool.push(this.dnas[i]);
            }
        }
        if(matingPool.length === 0){
            matingPool = this.dnas;
        }

        for(let i = 0; i < this.dnas.length; i++) {
            let parentA = matingPool[Math.floor(Math.random() * matingPool.length)]
            let parentB = matingPool[Math.floor(Math.random() * matingPool.length)]
            let child = parentA.crossover(parentB);
            child.mutate(this.mutationRate);
            this.dnas[i] = child;
        }
    }
}

module.exports = Population;