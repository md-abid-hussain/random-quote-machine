import axios from 'axios'

const quoteApi = axios.create({
    baseURL:'https://api.quotable.io',
})

export default quoteApi