let products = [];

storeData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
        subcategory.products.forEach(product => {
            products.push(product);
        });
    });
});


const weights = [
    5, 4, 3, 6, 2,
    4, 3, 2, 5,
    1, 2, 3, 1,
    2, 3, 2, 1,
    4, 2,
    1, 2, 1
];


products.forEach((product, index) => {
    product.weight = weights[index];
});

const values = products.map(product => product.price);

function displayProducts() {

    const productList =
        document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        const name =
            document.createElement("h3");

        name.textContent = product.name;


        const brand =
            document.createElement("p");

        brand.className = "brand";

        brand.textContent =
            product.brand;


        const price =
            document.createElement("p");

        price.className = "price";

        price.textContent =
            `Value: ₹${product.price.toLocaleString()}`;


        const weight =
            document.createElement("p");

        weight.className = "weight";

        weight.textContent =
            `Weight: ${product.weight} kg`;


        const rating =
            document.createElement("p");

        rating.className = "rating";

        rating.textContent =
            `⭐ ${product.rating}`;


        card.appendChild(name);

        card.appendChild(brand);

        card.appendChild(price);

        card.appendChild(weight);

        card.appendChild(rating);


        productList.appendChild(card);

    });
}


displayProducts();

function knapsack1D(weights, values, capacity) {

    const dp =
        Array(capacity + 1).fill(0);


    for (let i = 0; i < weights.length; i++) {

        for (
            let w = capacity;
            w >= weights[i];
            w--
        ) {

            dp[w] = Math.max(
                dp[w],
                values[i] + dp[w - weights[i]]
            );

        }
    }


    return dp[capacity];
}

function getBestValue(weights, values, itemCount, capacity) {

    const dp =
        Array(capacity + 1).fill(0);

    for (let i = 0; i < itemCount; i++) {

        for (
            let w = capacity;
            w >= weights[i];
            w--
        ) {

            dp[w] = Math.max(
                dp[w],
                values[i] + dp[w - weights[i]]
            );
        }
    }

    return dp[capacity];
}

function getSelectedProducts(weights, values, capacity) {

    const selectedProducts = [];

    let remainingCapacity = capacity;

    let remainingValue =
        getBestValue(
            weights,
            values,
            weights.length,
            capacity
        );

    for (
        let i = weights.length - 1;
        i >= 0;
        i--
    ) {

        if (remainingCapacity < weights[i]) {
            continue;
        }

        const valueWithoutProduct =
            getBestValue(
                weights,
                values,
                i,
                remainingCapacity-weights[i]
            );

        if (
            values[i] + valueWithoutProduct ===
            remainingValue
        ) {

            selectedProducts.push(i);

            remainingCapacity -= weights[i];

            remainingValue -= values[i];
        }
    }

    return selectedProducts;
}

function displaySelectedProducts(selectedProducts) {

    const selectedProductsContainer =
        document.getElementById("selected-products");

    selectedProductsContainer.innerHTML = "";

    selectedProducts.forEach(product => {

        const productBox =
            document.createElement("div");

        productBox.className = "selected-product";

        const name =
            document.createElement("strong");

        name.textContent = product.name;

        const details =
            document.createElement("p");

        details.textContent =
            `Value: ₹${product.price.toLocaleString()} | Weight: ${product.weight} kg`;

        productBox.appendChild(name);
        productBox.appendChild(details);

        selectedProductsContainer.appendChild(productBox);
    });
}

const capacityInput =
    document.getElementById("capacity");


const optimizeButton =
    document.getElementById("optimize-button");


optimizeButton.addEventListener(
    "click",
    function () {

        const capacity =
            capacityInput.valueAsNumber;

        if (Number.isNaN(capacity) || capacity <= 0) {
            alert("Please enter a valid capacity.");
            return;
        }

        const maximumValue =
            knapsack1D(weights, values, capacity);

        const selectedIndexes =
            getSelectedProducts(weights, values, capacity);

        const selectedProducts =
            selectedIndexes.map(index => products[index]);

        const totalWeight =
            selectedProducts.reduce(
            (total, product) => total + product.weight,0);    

        const maxValueElement =
            document.getElementById("max-value");

        maxValueElement.textContent =
            `₹${maximumValue.toLocaleString()}`;

        const totalWeightElement =
            document.getElementById("total-weight");

        totalWeightElement.textContent =
            `${totalWeight} kg`;    

        displaySelectedProducts(selectedProducts);    

        console.log("Maximum Value:", maximumValue);
    }
);


console.log(products);
console.log(values);

const testBestValue =
    getBestValue(weights, values, 10, 30);

console.log("Best value using first 10 products:", testBestValue);

const selectedIndexes =
    getSelectedProducts(weights, values, 30);

console.log("Selected indexes:", selectedIndexes);

const selectedProducts =
    selectedIndexes.map(index => products[index]);

const totalWeight =
    selectedProducts.reduce(
        (total, product) => total + product.weight,
        0
    );

console.log("Total Weight:", totalWeight);    

console.log("Selected Products:", selectedProducts);