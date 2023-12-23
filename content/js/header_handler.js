const header_carousel = document.querySelector("header .carousel-inner");

    async function get_carousel_data() {
        let res = await fetch("http://localhost:3000/slides");
        let data = await res.json();
        header_carousel.innerHTML+= `
            <div class="carousel-item active" data-bs-interval="3000">
                <img src=${data[0].slideImage} alt="...">
                <div class="carousel-caption d-none d-md-block z-1">
                <h6>${data[0].topText}</h6>
                <h5>${data[0].slideTitle}</h5>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="3000">
                <img src="${data[1].slideImage}" alt="...">
                <div class="carousel-caption d-none d-md-block z-1">
                <h6>${data[1].topText}</h6>
                <h5>${data[1].slideTitle}</h5>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="3000">
                <img src="${data[2].slideImage}" alt="...">
                <div class="carousel-caption d-none d-md-block z-1">
                <h6>${data[2].topText}</h6>
                <h5>${data[2].slideTitle}</h5>
                </div>
            </div>
        `
        }

    get_carousel_data()