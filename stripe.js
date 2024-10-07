class product {
    prod;
    quantity;
    constructor(p, c) {
        this.prod = p;
        this.quantity = c;
    }
}
class order {
    country;
    items;
    constructor(country, prod) {
        this.country = country;
        this.items = prod;
    }
}
function calculate_shipping_cost(ord, shipping_cost) {
    let shippingCost = 0;
    let currentQuantity = 0;
    let minQuantity = 0;
    for (let o of ord.items) {
        minQuantity = 0;
        currentQuantity = o.quantity;
        let productCost = shipping_cost.get(ord.country);
        for (let cost of productCost) {
            let costList = cost.get(o.prod);
            if (costList !== undefined) {
                for (let item of costList) {
                    if (item.get("maxQuantity") === null) {
                        shippingCost = shippingCost + (item.get("cost") * (currentQuantity - minQuantity));
                        break;
                    }
                    if (item.get("maxQuantity") < currentQuantity) {
                        shippingCost = shippingCost + ((item.get("maxQuantity") - minQuantity) * item.get("cost"));
                        minQuantity = item.get("maxQuantity");
                    }
                    else {
                        shippingCost = shippingCost + (item.get("cost") * (currentQuantity - minQuantity));
                        break;
                    }
                }
            }
        }
    }
    return shippingCost;
}
function test_calculate_shipping_cost() {
    let p1 = new product("mouse", 20);
    let p2 = new product("laptop", 5);
    let productlist = [p1, p2];
    let o1 = new order("US", productlist);
    let o2 = new order("CA", productlist);
    let usMouseCost1 = new Map();
    usMouseCost1.set("minQuantity", 0);
    usMouseCost1.set("maxQuantity", null);
    usMouseCost1.set("cost", 1000);
    let usMoustList = [usMouseCost1];
    let usLaptopCost1 = new Map();
    usLaptopCost1.set("minQuantity", 0);
    usLaptopCost1.set("maxQuantity", 2);
    usLaptopCost1.set("cost", 1000);
    let usLaptopCost2 = new Map();
    usLaptopCost2.set("minQuantity", 3);
    usLaptopCost2.set("maxQuantity", null);
    usLaptopCost2.set("cost", 900);
    let usLaptoplist = [usLaptopCost1, usLaptopCost2];
    let usMouse = new Map();
    usMouse.set("mouse", usMoustList);
    let usLaptop = new Map();
    usLaptop.set("laptop", usLaptoplist);
    //let caMouse = new Map<string, number>();
    //caMouse.set("mouse", 750);
    //let caLaptop = new Map<string, number>();
    //caLaptop.set("laptop", 1100); 
    let usList = [usMouse, usLaptop];
    //let caList = [caMouse, caLaptop];
    let shippingCost = new Map();
    shippingCost.set("US", usList);
    //shippingCost.set("CA", caList);
    console.log(calculate_shipping_cost(o1, shippingCost));
    //console.log(calculate_shipping_cost(o2, shippingCost));
}
test_calculate_shipping_cost();
//# sourceMappingURL=stripe.js.map