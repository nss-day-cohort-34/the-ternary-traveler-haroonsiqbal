const dataInterest = {

  interestFetch() {
      return fetch("http://localhost:8088/interests?_expand=place")
      .then(data => data.json())

    }

  }

  export default dataInterest