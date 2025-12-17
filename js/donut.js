
const rowBody = document.getElementById("rowBody");
const loading = document.getElementById("loading");

async function getMeal(mealName = "donuts") {
  loading.classList.remove("d-none");
  const data = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${mealName}`);
  const result = await data.json();
  display(result.recipes);
  loading.classList.add("d-none");
}
getMeal();
gsap.from(".back-btn", {
  opacity: 0,
  scale: 0,
  duration: 0.6,
  delay: 0.3,
  ease: " power1.out"
});


function display(array) {
  let box = "";
  for (let i = 0; i < array.length-1; i++) {
    box += `
      <div class="col-md-3 col-sm-6">
        <div class="card h-100" style="--i:${i + 1}">
          <img src="${array[i].image_url}" class="card-img-top" alt="Meal Image" />
          <div class="card-body text-center">
            <h5 class="card-title">${array[i].title}</h5>
          </div>
        </div>
      </div>`;
  }
  rowBody.innerHTML = box;
}


btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    let mealName = btn.innerHTML.trim();
    getMeal(mealName);
  });
});

