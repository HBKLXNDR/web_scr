//{
//         "image": "/images/test-sites/e-commerce/items/cart2.png",
//         "price": "$295.99",
//         "ratings": {
//             "rating": "3",
//             "reviews": "14"
//         }
//     }


const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const products = await page.$$eval("div.thumbnail", thumbnail => {
        return [...thumbnail].map((review) => {
            const image = review.getElementsByClassName('img-responsive')[0];
            const price = review.getElementsByClassName('pull-right price')[0];
            const rating = review.querySelectorAll("span.glyphicon");
            const reviews = review.querySelector(".ratings > .pull-right");

            return {
                image: image.src.split('https://www.webscraper.io')[1],
                price: price.innerHTML,
                ratings: {
                    reviews: +reviews.innerHTML.replace('reviews', ''),
                    rating: rating.length,
                }
            }
        })
    })

    await browser.close();

    console.log(products);
}

scrapeProduct("https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops").catch(e => console.log(e));

