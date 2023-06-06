const http = require('http');
const url = require('url');
const fs = require("fs");
const adminPageController  = require('./src/controller/AdminPage.controller');
const PORT = 2000

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    let chooseRouter;
    chooseRouter = ((typeof router[urlPath]) !== "undefined") ? router[urlPath] : adminPageController.getNotFoundPage;
    chooseRouter(req, res).catch(err => console.log(err.message));
});

server.listen(PORT, 'localhost', () => {
    console.log('Server is running at http://localhost:2000');
});

let router = {
    '/': adminPageController.getHomePage,
    '/detail': adminPageController.getHomestayDetailPage,
    '/addHomestay': adminPageController.handleAddHomestayPage,
    '/edit' : adminPageController.handleEditHomestayPage,
    '/delete': adminPageController.deleteHomestayPage,
}

module.exports = router;