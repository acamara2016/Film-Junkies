const config = {
    api_key: "4caf30ffa3252eef2b9fa4dbc2f5554a"
}
const api = {
    authentication:`https://api.themoviedb.org/3/authentication/token/new?api_key=${config.api_key}`,
}

module.exports = config;