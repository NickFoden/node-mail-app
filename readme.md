##Simple Node app that emails details from contact form to any email you want.

This repo requires you to add a config.js file with the following contents:

const sendGridOptions = {
auth: {
api_user: "Your sendgrid username",
api_key: "your sendgrid password"
}
};

module.exports = sendGridOptions;
