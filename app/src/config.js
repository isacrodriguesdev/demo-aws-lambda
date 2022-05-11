const AWS_API = "https://jidjjxq572.execute-api.us-east-1.amazonaws.com/dev"
const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=XC0qryqXOVJp5KuDUJwaD5yxrTzx7uE6"

module.exports = {
  Serverless: {
    API: {
      handler(route = "/") {
        return AWS_API + route
      }
    }
  },
  Giphy: {
    API: {
      handler(query, limit = 1) {
        return GIPHY_API + `&q=${query}&limit=${limit}&offset=0&rating=g&lang=en`
      }
    }
  }
}