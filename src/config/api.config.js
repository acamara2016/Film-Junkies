const config = {
    api_key: ""
}
const api = {
    authentication:`https://api.themoviedb.org/3/authentication/token/new?api_key=${config.api_key}`,
}

module.exports = config;
