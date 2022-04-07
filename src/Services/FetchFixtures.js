const URI = 'http://localhost:8000';

export default {
    async fetchFixtures() {
        try {
                let response = await fetch(URI + '/api/fixture');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}