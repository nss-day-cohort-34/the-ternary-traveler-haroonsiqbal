import factoryInterest from "./factoryTernary";
import domInterest from "./domTernary";
import dataInterest from "./dataTernary";

//render welcome text and point of interest form

const welcomeConverted = factoryInterest.factoryInterestWelcome();
domInterest.renderToInterest(welcomeConverted);
postsContainer.innerHTML = ""
const newInterestConverted = factoryInterest.factoryNewInterest();
domInterest.renderToInterestContainer(newInterestConverted);
dataInterest.interestFetch().then(interests => {
  for (const interest of interests) {
    const postedInterestConverted = factoryInterest.factoryPostedInterest(
      interest
    );
    domInterest.renderToPostsContainer(postedInterestConverted);
  }
});

//post new point of interest
const interests = document.querySelector("#interests")

interests.addEventListener("click", event => {
    if (event.target.id.startsWith("saveInterestButton")) {
      const interestName = document.querySelector(".interestNameInput");
      const interestDescription = document.querySelector(".interestDescriptionInput");
      const interestCost = document.querySelector(".interestCostInput");
      const interestReview = document.querySelector(".interestReviewInput")
      const interestLocation = document.querySelector(".interestLocationInput")
      console.log(interestName.value, interestDescription.value, interestCost.value, interestReview, interestLocation);

      const hiddenEditId = document.querySelector("#editID");

      if (hiddenEditId.value !== "") {
        const updatedObject = factoryInterest.createJSON(
          interestName.value,
          interestDescription.value,
          interestCost.value,
          interestReview.value,
          interestLocation,
        );
        editEntry(hiddenEditId.value, updatedObject).then(() => {
          postsContainer.innerHTML = "";
          console.log(postsContainer)
          dataInterest.interestFetch().then(interests => {
            for (const interest of interests) {
              const postedInterestConverted = factoryInterest.factoryPostedInterest(
                interest
              );
              domInterest.renderToPostsContainer(postedInterestConverted);
            }
          });
        });
      } else {
        const newInterest = factoryInterest.createJSON(
          interestName.value,
          interestDescription.value,
          interestCost.value,
          interestReview.value,
          interestLocation.value
        );
        console.log(newInterest);
        fetch("http://localhost:8088/interests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newInterest)
        }).then(() => {
          postsContainer.innerHTML = "";
          dataInterest.interestFetch().then(interests => {
            for (const interest of interests) {
              const postedInterestConverted = factoryInterest.factoryPostedInterest(
                interest
              );
              domInterest.renderToPostsContainer(postedInterestConverted);
            }
          });
        });
      }
    }
  });

//delete point of interest

interests.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteButton")) {
      const deleteID = event.target.id.split("--")[1];
      if (confirm("Are you sure you want to delete this point of interest?")) {
        deleteEntry(deleteID)
        .then(() => {
            postsContainer.innerHTML = "";
            dataInterest.interestFetch().then(interests => {
                for (const interest of interests) {
                const postedInterestConverted = factoryInterest.factoryPostedInterest(
                    interest
                );
                domInterest.renderToPostsContainer(postedInterestConverted);
                }
            });
        });
      } else {}
    }
  });

  const deleteEntry = deleteID => {
    return fetch(`http://localhost:8088/interests/${deleteID}`, {
      method: "DELETE"
    }).then(response => response.json());
  };

// edit point of interest

const updateFields = editIDparam => {
    const hiddenEditId = document.querySelector("#editID");
    const interestName = document.querySelector(".interestNameInput");
    const interestDescription = document.querySelector(".interestDescriptionInput");
    const interestCost = document.querySelector(".interestCostInput");
    const interestReview = document.querySelector(".interestReviewInput")
    const interestLocation = document.querySelector(".interestLocationInput")

    return fetch(`http://localhost:8088/interests/${editIDparam}`)
      .then(response => response.json())
      .then(interests => {
        hiddenEditId.value = interests.id;
        interestName.value = interests.name;
        interestDescription.value = interests.description;
        interestCost.value = interests.cost
        interestReview.value = interests.review
        interestLocation.value = interests.location
      });
  };

  interests.addEventListener("click", event => {
    if (event.target.id.startsWith("editButton")) {
      console.log(event.target.id);
      const entryToEdit = event.target.id.split("--")[1];
      console.log(entryToEdit);

      updateFields(entryToEdit)
    }
  });

  const editEntry = (editID, updatedObject) => {

   return fetch(`http://localhost:8088/interests/${editID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedObject)
    })
      .then(res => res.json())
      .then(() => {
        const hiddenEditId = document.querySelector("#editID");
        hiddenEditId.value = "";
      });
  };