const domInterest = {

    renderToInterest(HTMLString) {
        const interests = document.querySelector("#interests")
        interests.innerHTML = HTMLString
    },

    renderToInterestContainer(HTMLString) {
        const interestsContainer = document.querySelector("#interestsContainer")
        interestsContainer.innerHTML = HTMLString
    },

    renderToPostsContainer(HTMLString) {
        const postsContainer = document.querySelector("#postsContainer")
        postsContainer.innerHTML += HTMLString
    }
}
export default domInterest