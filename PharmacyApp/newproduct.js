class Productnew {
    constructor(id, name, image, price, manufactory) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.manufactory = manufactory;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getImage() {
        return this.image;
    }
    getPrice() {
        return this.price;
    }
    getManufactory() {
        return this.manufactory;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setImage(image) {
        this.image = image;
    }
    setPrice(price) {
        this.price = price;
    }
}