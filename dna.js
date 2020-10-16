class DNA {
    constructor(customers, products, totals, prices, toUse){
        this.customers = customers;
        this.products = products;
        this.totals = totals;
        this.prices = prices;
        this.toUse = toUse;

        this.length = products.length;
        this.width = customers.length;

        this.genes = new Array(this.width)

        //Populate genes
        for(let i = 0; i < this.width; i++){
            let customer = []
            for(let j = 0; j < this.length; j++){
                customer[j] = (Math.round(Math.random()));
            }
            this.genes[i] = (customer);
        }
    }

    fitness(){
        let score = 0;
        let worstScore = 0;
        let totalDiff = 0;
        let productUse = new Array(this.length)
        for(let i = 0; i < this.width; i++){
            let customerDiff = this.totals[i];
            worstScore += this.totals[i];
            for(let j = 0; j < this.length; j++){
                customerDiff -= this.prices[j] * this.genes[i][j];
                totalDiff += Math.pow(this.genes[i][j] / (this.toUse[j][0] * this.toUse[j][1]) , 3) * 20
                if (productUse[j] === undefined){
                    productUse[j] = 0;
                }
                productUse[j] += this.genes[i][j]
            }
            customerDiff = Math.abs(customerDiff)
            let percDiff = Math.pow(Math.abs(customerDiff/this.totals[i]),3) * 20
            totalDiff += customerDiff + percDiff;
        }
        score = worstScore - totalDiff
        for(let i = 0; i < this.length; i++){
            let usedPercentage = productUse[i]/ this.toUse[i][0] * 100;

            if(usedPercentage < this.toUse[i][1]){
                score -= (this.toUse[i][1]- usedPercentage) * 25;
            }
            if(usedPercentage > 100){
                score -= 500;
            }
        }
        return Math.round(score)
    }
    crossover(partner){
        let midpoint = Math.round(Math.random() * this.length)

        let child = new DNA(this.customers, this.products, this.totals, this.prices, this.toUse)

        for(let i = 0; i < this.width; i++){
            for(let j = 0 ; j < this.length; j++){
                if (j < midpoint){
                    child.genes[i][j] = this.genes[i][j]
                } else {
                    child.genes[i][j] = partner.genes[i][j]
                }
            }
        }
        return child
    }
    mutate(mutationRate){
        for(let i = 0; i < this.width; i++){
            for(let j = 0 ; j < this.length; j++){
                if (Math.random() < mutationRate) {
                    this.genes[i][j] += Math.round(Math.random() * 2) - 1;
                }
                if(this.genes[i][j] < 0 ){
                    this.genes[i][j] = 0;
                }
            }
        }
    }
}


module.exports = DNA;