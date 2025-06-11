import 'dotenv/config';


export default {
    clickUpApiKey: process.env.CLICKUP_API_KEY,
    clickUpListId: process.env.CLICKUP_LIST_ID,
    port: process.env.PORT || 3000,
    clickUpApiUrl: 'https://api.clickup.com/api/v2',
};