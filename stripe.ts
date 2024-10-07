class product{
    prod: string;
    quantity: number;

    constructor(p: string, c: number){
        this.prod = p;
        this.quantity = c;
    }
}

class order{
    country: string;
    items: product [];

    constructor(country: string, prod: product[]){
        this.country = country;
        this.items = prod;
    }
}

function calculate_shipping_cost(ord: order, shipping_cost: Map<string, Map<string, Map<string, number>[]>[]>){
    let shippingCost = 0;
    let currentQuantity = 0;
    let minQuantity = 0;

    for(let o of ord.items){
        minQuantity = 0;
        currentQuantity = o.quantity;
        let productCost = shipping_cost.get(ord.country);
        for(let cost of productCost){
            let costList = cost.get(o.prod);
            if(costList !== undefined){
                for(let item of costList){
                    if(item.get("maxQuantity") === null){
                        shippingCost = shippingCost + (item.get("cost")*(currentQuantity-minQuantity));
                        break;
                    }
                    if(item.get("maxQuantity") < currentQuantity){
                        shippingCost = shippingCost + ((item.get("maxQuantity")-minQuantity)*item.get("cost"));
                        minQuantity = item.get("maxQuantity");
                    } else {
                        shippingCost = shippingCost + (item.get("cost")*(currentQuantity-minQuantity));
                        break;
                    }
                }
            }
        }
    }

    return shippingCost;
}

function test_calculate_shipping_cost(){
    let p1 = new product("mouse", 20);
    let p2 = new product("laptop", 5);

    let productlist = [p1, p2];

    let o1 = new order("US", productlist);
    let o2 = new order("CA", productlist);

    let usMouseCost1: Map<string, number> = new Map<string, number>();
    usMouseCost1.set("minQuantity", 0);
    usMouseCost1.set("maxQuantity", null);
    usMouseCost1.set("cost", 1000);

    let usMoustList = [usMouseCost1];
    let usLaptopCost1: Map<string, number> = new Map<string, number>();
    usLaptopCost1.set("minQuantity", 0);
    usLaptopCost1.set("maxQuantity", 2);
    usLaptopCost1.set("cost", 1000);

    let usLaptopCost2: Map<string, number> = new Map<string, number>();
    usLaptopCost2.set("minQuantity", 3);
    usLaptopCost2.set("maxQuantity", null);
    usLaptopCost2.set("cost", 900);
    let usLaptoplist = [usLaptopCost1, usLaptopCost2];

    let usMouse = new Map<string, Map<string, number>[]>();


    usMouse.set("mouse", usMoustList);
    let usLaptop = new Map<string, Map<string, number>[]>();
    usLaptop.set("laptop", usLaptoplist);


    //let caMouse = new Map<string, number>();
    //caMouse.set("mouse", 750);
    //let caLaptop = new Map<string, number>();
    //caLaptop.set("laptop", 1100); 
    let usList = [usMouse, usLaptop];
    //let caList = [caMouse, caLaptop];

    let shippingCost: Map<string, Map<string, Map<string, number>[]>[]> = new Map<string, Map<string, Map<string, number>[]>[]>();
    shippingCost.set("US", usList);
    //shippingCost.set("CA", caList);


    console.log(calculate_shipping_cost(o1, shippingCost));
    //console.log(calculate_shipping_cost(o2, shippingCost));
}

test_calculate_shipping_cost();