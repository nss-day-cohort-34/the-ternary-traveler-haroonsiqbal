const factoryInterest = {

    factoryInterestWelcome() {
        return `
        <input type="hidden" id="editID" value="">
        <div>
        <h1>The Ternary Traveler</h1>
        </div>
        <div id="interestsContainer">
        </div>
        <div id="postsContainer">
        </div>
        `
    },

    factoryNewInterest() {
        return `
        <fieldset id="forms">
            <legend id="legend">Add or Modify Points of Interest</legend>
            <label for="interestName">Name</label>
            <input class="interestNameInput" type="text" name="interestName" id="interestName"><br>
            <label for="interestDescription">Description</label>
            <input class="interestDescriptionInput" type="text" name="interestDescription" id="interestDescription"><br>
            <label for="interestCost">Cost</label>
            <input class="interestCostInput" type="text" name="interestCost" id="interestCost"><br>
            <label for="interestReview">Review</label>
            <input class="interestReviewInput" type="text" name="interestReview" id="interestReview">
            <p>Location</p>
            <select class="interestLocationInput name="interestLocation id="interestLocation">
                <option value="1">Italy</option>
                <option value="2">Switzerland</option>
                <option value="3">France</option>
            </select>
        </fieldset>
        <div>
            <button id="saveInterestButton" name="saveInterestButton">Save</button>
        </div>
        `
      },

    createJSON(name, description, cost, review, placeId) {
        return {
            name: name,
            description: description,
            cost: cost,
            review: review,
            placeId: placeId
          }
    },

    factoryPostedInterest(object) {
        return `
        <div id="post">
        <h4>Name: ${object.name}</h4>
        <h5>Description: ${object.description}</h5>
        <h5>Cost: ${object.cost}</h5>
        <h5>Review: ${object.review}</h5>
        <h5>Location: ${object.place.name}</h5>
        <div>
        <button class="button2" id="editButton--${object.id}">Edit</button>
        </div>
        <div>
        <button class="button2" id="deleteButton--${object.id}">Delete</button>
        </div>
        </div>
        `
    }

    }

    export default factoryInterest