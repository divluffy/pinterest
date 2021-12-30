var gridContainer = document.querySelector(".grid-container");
var formSearch = document.querySelector(".form_search");
var inputSerch = document.querySelector(".input_serch");
var loader = document.querySelector(".loader");

let page = 1;
let query = "love";
let moreLoad = false;
loadImage(query);

formSearch.addEventListener("submit", (e) => {
  console.log("send");
  e.preventDefault();
  query = inputSerch.value;
  gridContainer.innerHTML = "";
  loader.classList.add("active");
  loadImage(query);
});

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 50 && !moreLoad) {
    loadImage(query);
    moreLoad = true;
    loader.classList.add("active");
  }
});

function loadImage(query) {
  let url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=7hTcanzZHuFtZWDwYJxn_q1NcwLueIkKwBMlqLrnQVM`;
  page++;
  fetch(url)
    .then((res) => res.json())
    .then(({ results }) => {
      for (let i = 0; i < results.length; i++) {
        let src = results[i].urls.regular;
        gridContainer.innerHTML += `
      <div class="grid-item">
      <img src="${src}" alt="">
      <div class="bowl_cover">
          <div class="btn_save">
              <button>حفظ</button>
          </div>
          <div class="bottom_option_Card">
              <a href='${src}'  target="_blank"  class="bowl_icon pop">
                  <svg class="Hn_ gUZ pBj" height="12" width="12" viewBox="0 0 24 24" aria-label="صفحة خارجية"
                      role="img">
                      <path
                          d="M4.928 1a2.357 2.357 0 1 0 0 4.714h10.024L1.69 18.976a2.36 2.36 0 0 0 0 3.334 2.35 2.35 0 0 0 1.668.69c.603 0 1.206-.229 1.667-.69l13.26-13.263v10.024a2.358 2.358 0 1 0 4.715 0V1H4.928Z">
                      </path>
                  </svg>
              </a>
              <div class="side_two">
                  <div class="bowl_icon">
                      <svg class="gUZ pBj" height="20" width="20" viewBox="0 0 24 24"
                          aria-label="المزيد من الخيارات" role="img">
                          <path
                              d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z">
                          </path>
                      </svg>
                  </div>
                  <div class="bowl_icon">
                      <svg class="gUZ pBj" height="20" width="20" viewBox="0 0 24 24" aria-label="إرسال"
                          role="img">
                          <path
                              d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z">
                          </path>
                      </svg>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
      }
    })
    .then(() => {
      imagesLoaded(gridContainer, () => {
        new Masonry(gridContainer, {
          itemSelector: ".grid-item",
          columnWidth: 330,
          gutter: 20,
          isFitWidth: true,
        });
        moreLoad = false;
        loader.classList.remove("active");
      });
    });
}
