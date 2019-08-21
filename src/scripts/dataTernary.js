const dataInterest = {

  interestFetch() {
      return fetch("http://localhost:8088/interests")
      .then(data => data.json())

    }

  }

  export default dataInterest