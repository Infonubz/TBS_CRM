// authConfig.js

export const msalConfig = {
  auth: {
    clientId: '	5dbd81bd-24c2-40bc-bee6-bf0e34529491', // Replace with your application (client) ID
    authority: 'https://login.microsoftonline.com/07bb39ed-9c90-4f4f-8ea7-dae5ab5006d4', // Replace with your tenant ID or common for multi-tenant apps
    redirectUri: 'http://localhost:3000', // Your React app's URL
  },
  cache: {
    cacheLocation: 'localStorage', // Store tokens in localStorage
    storeAuthStateInCookie: false, // Set to true for IE11 or older
  },
};

export const loginRequest = {
  scopes: ['https://analysis.windows.net/powerbi/api/.default'], // Define the scopes you need
};

