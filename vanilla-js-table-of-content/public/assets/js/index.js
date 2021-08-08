import { fetchJSON } from "./backend.service.js";
// get book id from url
const bookID = window.location.pathname.split("/").pop();
const chapterMap = {};

// IIFE accordion
(function initAccordion() {
  document.querySelector(".accordion").addEventListener("click", function (e) {
    const clickTarget = e.target;
    if (!clickTarget.matches(".accordion .a-btn")) return;
    else {
      if (!clickTarget.parentElement.classList.contains("active")) {
        // if panel is closed
        const chapterId = clickTarget.parentElement.firstElementChild.innerText;
        // checking if content has already been fetched
        if (!chapterMap[chapterId])
          renderAccordionPanelContent(
            clickTarget.parentElement.firstElementChild.innerText,
            clickTarget.parentElement
          );
        clickTarget.parentElement.classList.add("active");
      } else {
        // close the panel
        clickTarget.parentElement.classList.remove("active");
      }
    }
  });
})();

// IIFE book table of content
(function loadBookTOC() {
  fetchJSON(`/api/book/${bookID}`)
    .then((chapters) => {
      const listOfChapters = chapters.response.sort(compare); // sort based on given sequence
      loadJumbotron(); // book cover load

      listOfChapters.forEach((chapter) => {
        let completion = chapter.childrenCount
          ? `${((chapter.completeCount / chapter.childrenCount) * 100).toFixed(0)}%`
          : "";
        if (chapter.status == "COMPLETE") completion = "100%";
        const template = `
            <div class="a-container">
                <span style="display:none">${chapter.id}</span>
                <h4 class="a-btn"><span class="chevron"></span>${chapter.title} <span style="float: right">${completion}</span></h4>
            </div>
          `;
        const accordion = document.querySelector(".accordion");
        accordion.insertAdjacentHTML("beforeend", template);
      });
    })
    .catch((error) => {
      load404(error);
    });
})();

function renderAccordionPanelContent(id, target) {
  fetchJSON(`/api/book/${bookID}/section/${id}`)
    .then((res) => {
      const subChapters = res?.response[id]?.sort(compare);
      chapterMap[id] = subChapters;
      let template = `
        <div class="a-panel">
        ${subChapters
          .map((lesson) => {
            const completeIcon =
              lesson.status == "COMPLETE"
                ? `<i class="bi bi-check-circle-fill pr-2"></i>`
                : `<i class="bi bi-circle pr-2"></i>`;
            return `
            <p>${completeIcon} ${lesson.title.replace("- Math 6 CCSS", "")}</p>
            `;
          })
          .join("")}
        </div>
      `;
      target.insertAdjacentHTML("beforeend", template);
    })
    .catch((err) => {
      console.error(err);
      let template = `
        <div class="a-panel">
            <p style="color: gray">No individual lessons available</p>
        </div>
      `;
      chapterMap[id] = template;
      target.insertAdjacentHTML("beforeend", template);
    });
}
const compare = (a, b) => (a.sequenceNO < b.sequenceNO ? -1 : 1);

function loadJumbotron() {
  const template = `
          <div class="parent">
            <img
              class="responsive-img child"
              src="https://via.placeholder.com/150"
              alt="img"
            />
            <div class="child">
              <h1 class="jumbotron__title">TOC</h1>
              <h3 class="jumbotron__title">Maths book</h3>
            </div>
          </div>
      `;
  const jumbo = document.querySelector(".jumbotron__contents");
  jumbo.insertAdjacentHTML("beforeend", template);
}

function load404(error) {
  const template = `
          <div class="parent">
            <div class="child">
              <h4 class="jumbotron__title">Error:</h4>
              <p class="jumbotron__title">${error}</p>
            </div>
          </div>
      `;
  const jumbo = document.querySelector(".jumbotron__contents");
  jumbo.insertAdjacentHTML("beforeend", template);
}
