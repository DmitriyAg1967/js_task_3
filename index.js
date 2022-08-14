console.log("script started");
class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable() {
        this.available = true;
    }
}

class GoodsList {
    #goods = [];
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }


    get list() {
        let available_goods = [];
        for (let i = 0; i < this.#goods.length; i++) {
            if (this.filter.test(this.#goods[i].name) === true) {
                available_goods.push(this.#goods[i]);
            }
        }

        let sort_goods = function (product_a, product_b) {
            if (this.sortPrice === true) {
                if (this.sortDir === true) {
                    product_a.price - product_b.price;
                }
                if (this.sortDir === false) {
                    product_b.price - product_a.price;
                }
            }
        }
        return (available_goods.sort(sort_goods.bind(GoodsList)));
    }

    add(newProduct) {
        this.#goods.push(newProduct);
        let result = this.#goods;
        return (result)
    }

    remove(id_for_remove) {
        let included = false
        this.#goods.forEach((good, i) => {
            if (good.id === id_for_remove) { ; this.#goods.splice(i, 1); included = true }
        })

        let newProduct = this.#goods;
        if (included = true) {
            return (newProduct)
        } else { return "Товар не найден" }
    }

    filter_good() {
        let result = this.#goods.filter(good => good.available === true);
        return (result);
    }
}

class BasketGood extends Good {
    constructor(current_item, amount) {
        super(current_item);
        this.amount = amount;
        this.id = current_item.id;
        this.name = current_item.name;
        this.sizes = current_item.sizes;
        this.price = current_item.price;
        this.available = current_item.available;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    get totalAmount() {
        let result = this.goods.reduce(function (totalAmount, good) {
            return totalAmount + good.amount * good.price;
        }, 0);
        return result
    }

    get totalSum() {
        let result = this.goods.reduce(function (totalSum, good) {
            return totalSum + good.amount
        }, 0);

        return result
    }

    add(good, amount) {
        if (typeof amount !== 'number') {
            throw new Error("Введите количество");
        }
        if (amount < 0) {
            this.remove(good, amount);
        } else {
            let included = false
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === good.id) {
                    this.goods[i].amount = this.goods[i].amount + amount
                    included = true
                    break
                }
            }
            if (included === false) {
                good.amount = amount
                this.goods.push(good)
            }
        }
    }

    remove(good, amount) {
        if (typeof amount !== 'number') {
            throw new Error("Введите количество");
        }
        let idList = this.goods.map((currentGood) => currentGood.id)
        if (idList.includes(good.id) === true) {
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === good.id) {
                    this.goods[i].amount = this.goods[i].amount - amount;
                }
                if (this.goods[i].amount < 0) {
                    this.goods.splice(i, 1);
                }
            }
        }
    }

    clear() {
        this.goods.splice(0, this.goods.length)
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true);
        return this.goods;
    }
}

///////////////////////////////////////////////////

let product_1 = new Good(
    1,
    'Рубашка',
    'Рубашка с рисунком в клеточку.',
    [46, 48, 50, 52, 54],
    1200,
    true,
);

let product_2 = new Good(
    2,
    'Шорты',
    'Джинсовые, синие.',
    [46, 48, 50, 52, 54],
    800,
    true,
);

let product_3 = new Good(
    3,
    'Туфли',
    'Туфли мужские, кожанные, черные.',
    [39, 40, 41, 42, 43],
    2500,
    true,
);

let product_4 = new Good(
    4,
    'Джинсы',
    'Черные.',
    [46, 48, 50, 52, 54],
    4500,
    false,
);

let product_5 = new Good(
    5,
    'Куртка',
    'Демесезонная, синяя.',
    [46, 48, 50, 52, 54],
    3300,
    false,
);

let all_product = [];
all_product.push(product_1);
all_product.push(product_2);
all_product.push(product_3);
all_product.push(product_4);




regexp = /(Рубашка|Шорты|Туфли|Джинсы|Куртка)/i;
let newCatalogue = new GoodsList(all_product, regexp, true, true);


let newBasketGood_1 = new BasketGood(product_1, 5);
let newBasketGood_2 = new BasketGood(product_2, 5);
let newBasketGood_3 = new BasketGood(product_3, 5);
let newBasketGood_4 = new BasketGood(product_4, 5);
let newBasketGood_5 = new BasketGood(product_5, 5);


//console.log(product_1, product_2, product_3, product_4, product_5,);

//console.log(newBasketGood_1);
//console.log(newBasketGood_2);


let newBasket = new Basket()
//console.log(newBasket);

product_4.setAvailable();
//console.log(product_4.available);

//console.log(newCatalogue.list);

//console.log(newCatalogue.add(product_5));

//console.log(newCatalogue.remove(undefined));

//console.log(newCatalogue.filter_good(true));

newBasket.add(newBasketGood_1, newBasketGood_1.amount)
//console.log(newBasket);

newBasket.add(newBasketGood_1, 12)
//console.log(newBasket);

newBasket.add(newBasketGood_4, 3)

//console.log("удаление товара 1");
newBasket.remove(newBasketGood_1, 10)
//console.log(newBasket);

//newBasket.clear()
//console.log(newBasket);

//newBasket.removeUnavailable()
//console.log(newBasket);

//console.log("Общая стоимость = " + newBasket.totalAmount);

//console.log("Общее количество = " + newBasket.totalSum);