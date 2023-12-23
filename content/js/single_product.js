const single_product_container = document.querySelector(".single-product-details .container-fluid");
const main_image = document.querySelector(".single-product__main-image img");
const single_images = document.querySelector(".single-product-images__content .row");
const single_video = document.querySelector(".single-product-video__content");



let getID_product = localStorage.getItem("product_id");

async function get_data_from_api() {
    let response = await fetch(`http://localhost:3000/products/${getID_product}`);
    let product_data = await response.json();
    display_single_product_details(product_data)
    display_single_product_images(product_data)
    display_single_product_video(product_data)
};


get_data_from_api()

function display_single_product_details(product) {
    single_product_container.innerHTML= `
    <div class="row align-items-lg-center">
        <h1 class="single-product-title display-5 text-capitalize text-center color-text fw-bold mb-3">${product.category}</h1>
        <div class="col-lg-7">
            <div class="single-product__image text-md-center">
                <img class="w-100" src=${product.thumbnails} alt="${product.title}">
            </div>
        </div>
        <div class="col-lg-5">
            <div class="single-product__content">
                <h2 class="text-capitalize mb-3 color-text">
                    <span class="fw-bolder text-dark">${product.category} : </span> ${product.title}
                </h2>
                <p class="fw-bold single-product__description text-secondary">${product.description}</p>
                <div class="d-flex justify-content-between single-product__info mt-4">
                    <h5 class="color-text fw-bold fs-4">
                     <span class=" text-dark">Price :</span> ${product.price}$
                     </h5>
                    <h5 class="color-text fw-bold fs-4">
                        <span class=" text-dark">CC :</span> ${product.cc}
                    </h5>
                </div>
            </div>
        </div>
    </div>
    `
}

function display_single_product_images(image) {
    main_image.src = image.images[0]
    let src_imag = image.images.map(src =>{
        return`
            <div class="col-md-3 col-6">
                <div class="single__image rounded overflow-hidden">
                    <img class="w-100" src=${src} alt="">
                </div>
            </div>
        `
    });
    single_images.innerHTML= src_imag.join("")
}

single_images.addEventListener("click", (e) =>{
    let image_item = e.target.closest("img");
    if (image_item) {
        main_image.src = image_item.src
    }else{
        return false
    }
})


function display_single_product_video(video){ 
        if (video.video != undefined) {
            single_video.innerHTML = `<iframe src="${video.video}" frameborder="0" allowfullscreen></iframe>`
        }else{
            single_video.innerHTML = `
                <div class="text-center">
                    <img class="img-fluid" src=${video.thumbnails} />
                </div>
            `
        }
}
