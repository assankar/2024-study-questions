class product2{
    prod: string;
    quantity: number;

    constructor(p: string, c: number){
        this.prod = p;
        this.quantity = c;
    }
}

class order2{
    country: string;
    items: product [];

    constructor(country: string, prod: product[]){
        this.country = country;
        this.items = prod;
    }
}

class productCost {
    product: string;
    cost: costVariability[];

    constructor(p: string, c: costVariability[]){
        this.product = p;
        this.cost = c;
    }
}

class costVariability {
    minQuantity: number;
    maxQuantity: number;
    cost: number;

    constructor(minQ: number, maxQ: number, cost: number){
        this.minQuantity = minQ;
        this.maxQuantity = maxQ;
        this.cost = cost;
    }
}

class countryCost {
    country: string;
    productCostList: productCost[];

    constructor(country: string, pC: productCost[]){
        this.country = country;
        this.productCostList = pC;
    }
}

function calculate_shipping_cost_2(ord: order2, countryCost : countryCost[]){
    let result = 0;
    let minElements = 0;
    let maxElements = 0;

    for(let o of ord.items){
        maxElements = o.quantity;
        minElements = 0;
        for(let c of countryCost){
            if(c.country === ord.country){
                for(let p of c.productCostList){
                    let complete = false;
                    if(p.product === o.prod){
                        for(let cV of p.cost){
                            if(cV.maxQuantity === null){
                                result = result + ((maxElements-minElements) * cV.cost);
                                complete = true;
                                break;
                            }
                            if(cV.maxQuantity >= maxElements){
                                result = result + ((maxElements-minElements) * cV.cost)
                                complete = true;
                                break;
                            } else {
                                result = result + ((cV.maxQuantity - minElements)*cV.cost);
                                minElements = cV.maxQuantity;
                            }
                        }
                    }

                    if(complete){
                        break;
                    }
                }
            }
        }
    }

    return result;
}

function test_calculate_shipping_cost2(){
    let p1 = new product2("mouse", 20);
    let p2 = new product2("laptop", 5);

    let productlist = [p1, p2];

    let o1 = new order2("US", productlist);
    let o2 = new order2("CA", productlist);

    let usMouseCostVariability = new costVariability(0, null, 550);
    let usLaptopCostVariability = new costVariability(0, 2, 1000);
    let usLaptopCostVariability2 = new costVariability(2, null, 900);

    let caMouseCostVariability = new costVariability(0, null, 750);
    let caLaptopCostVariability = new costVariability(0, 2, 1100);
    let caLaptopCostVariability2 = new costVariability(3, null, 1000);

    let usMouseProductCost = new productCost("mouse", [usMouseCostVariability]);
    let usLaptopProductCost = new productCost("laptop", [usLaptopCostVariability, usLaptopCostVariability2]);
    let caMouseProductCost = new productCost("mouse", [caMouseCostVariability]);
    let caLaptopProductCost = new productCost("laptop", [caLaptopCostVariability, caLaptopCostVariability2]);

    let countryUS = new countryCost("US", [usMouseProductCost, usLaptopProductCost]);
    let countryCA = new countryCost("CA", [caMouseProductCost, caLaptopProductCost]);


    console.log(calculate_shipping_cost_2(o1, [countryUS, countryCA]));
    console.log(calculate_shipping_cost_2(o2, [countryUS, countryCA]));
}

test_calculate_shipping_cost2();