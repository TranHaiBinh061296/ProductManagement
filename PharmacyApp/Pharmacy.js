class Product {
    constructor(id, name, image, price, manufactory) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.manufactory = manufactory;
    }
}
let products = []
const key_data = "product_data";
const sort_asc = 'asc';
const sort_desc = 'desc';
// tạo vùng nhớ localStorage
function init() {
    if (localStorage.getItem(key_data) == null) {
        products = [
            new Product(1, "Panadol", "https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/vi_vn/vietnamproduct/panadol_extra/product_global_styles/desktop-408x300.png?auto=format", 102000, "Dược phẩm Khánh Hòa"),
            new Product(2, "Gingko", "https://nhathuocthucanh.com/wp-content/uploads/2021/07/00017403-ginkgo-biloba-240mg-10x10-usa-xanh-hinh-cai-la-2816-5b4c_large-1-600x600.jpg", 50000, "Nhập khẩu Úc"),
            new Product(3, "Euginca", "https://cf.shopee.vn/file/726f299e61d65bed106e1df3c84b1879", 45000, "Germany Pharma"),
            new Product(4, "noxa", "https://cf.shopee.vn/file/03de778f2c1497df391913e119a8916b", 210000, "Thailand"),
        ];
        localStorage.setItem(key_data, JSON.stringify(products));
    }
    else {
        products = JSON.parse(localStorage.getItem(key_data));
    }
}
function renderProduct(data) {
    let htmls = data.map(function (product, index) {
        return `
                <tr onclick="editPharmacy(${product.id})"  id="tr_${product.id}">
                    <td>${product.id}</td>
                    <td id="tdname_${product.id}">${product.name}</td>
                    <td >
                    <img style="width:60px; height:60px;" src="${product.image}" alt="">
                    </td>
                    <td>${formatCurrency(product.price)}</td>
                    <td>${product.manufactory}</td>
                    <td>
                        <button  onclick="editPharmacy(${product.id})" id="edit_${product.id}" class="btn btn-warning">Edit</button>
                        <button  onclick="removePharmacy(${product.id})" id="delete_${product.id}" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
        `
    });
    document.querySelector('.tbpharmacy>tbody').innerHTML = htmls.join("");
}


function formatCurrency(number) {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

function addPharmacy() {
    // b1: lấy value từ các field
    // b2: tạo ra 1 đối tượng Product
    // b3: thêm vào students
    // b4: renderproduct()
    // b5: clear form
    let productName = document.querySelector("#productName").value;
    if (productName == null || productName == "") {
        alert("Product Name is required");
        return;
    }
    let image = document.querySelector("#image").value;
    let price = Number(document.querySelector("#price").value);
    let manufactory = document.querySelector("#manufactory").value;
    let id = getLastestId() + 1;
    let newProduct = new Product(id, productName, image, price, manufactory);
    products.push(newProduct)
    localStorage.setItem(key_data, JSON.stringify(products));
    renderProduct(products);
    clearForm();
}

//tìm ID lớn nhất
function getLastestId() {
    let productTemp = [...products];
    let maxId = productTemp.sort(function (pdt1, pdt2) {
        return pdt2.id - pdt1.id
    })[0].id
    return maxId;
}
//reset lại form
function clearForm() {
    document.querySelector("#productName").value = "";
    document.querySelector("#image").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#manufactory").value = "";
}
// delete product
function removePharmacy(id) {
    let confirmed = window.confirm("Are you sure to remove this product?");
    if (confirmed) {
        let position = products.findIndex(function (pdt) {
            return pdt.id == id;
        })
        products.splice(position, 1);
        localStorage.setItem(key_data, JSON.stringify(products));
        renderProduct(products);
    }
}
function sort(direct) {
    if (direct == "sort_asc") {
        products.sort(function (pdt1, pdt2) {
            return pdt1.price - pdt2.price;
        });
    } else {
        //products.reverse();
        products.sort(function (pdt1, pdt2) {
            return pdt2.price - pdt1.price;
        });
    }
    renderProduct(products);
}
function sortabc(direct) {
    if (direct == "sortabc_asc") {
        products.sort(function (pdt1, pdt2) {
            return pdt1.name.localeCompare(pdt2.name);
        });
    } else {
        //products.reverse();
        products.sort(function (pdt1, pdt2) {
            return pdt2.name.localeCompare(pdt1.name);
        });
    }
    renderProduct(products);
}
// tạo hàm lấy thông tin từ products
function getProductById(pdtId) {
    return products.find(function (pdt) {
        return pdt.id == pdtId;
    })
}
// edit chỉnh sửa thông tin product
function editPharmacy(pdtId) {

    products.forEach(function (item) {
        if (item.id === pdtId) {
            document.querySelector("#productName").value = item.name;
            document.querySelector("#image").value = item.image;
            document.querySelector("#price").value = item.price;
            document.querySelector("#manufactory").value = item.manufactory;
            document.querySelector("#cancel").classList.remove('done');
            document.querySelector("#save").classList.remove('done');
            return;
        }
    });
    localStorage.setItem(key_data, JSON.stringify(products));
}

function cancelPharmacy(pdtId) {
    clearForm()
    document.querySelector("#save").classList.add('done');
    document.querySelector("#cancel").classList.add('done');
}
function savePharmacy() {
    let newproductName = document.getElementById("productName").value;
    if (!newproductName) {
        alert("ID is required !");
        return;
    }
    let newImage = document.getElementById("image").value;
    let newprice = document.getElementById("price").value;
    let newManufactory = document.getElementById("manufactory").value;
    for (let i = 0; i < products.length; i++) {
        if (newproductName == products[i].name) {
            products[i].image = newImage;
            products[i].price = newprice;
            products[i].manufactory = newManufactory;
        }
    }
    document.querySelector("#cancel").classList.add('done');
    localStorage.setItem(key_data, JSON.stringify(products));
    document.querySelector("#save").classList.add('done');
    document.querySelector("#cancel").classList.add('done');
    clearForm();
    renderProduct(products);
}
// tìm kiếm name product
function search() {
    let keywork = document.querySelector('#searchicon').value;
    let result = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    });
    renderProduct(result);
}
function main() {
    init();
    renderProduct(products);
}
main();
//drgdsdfsdaf