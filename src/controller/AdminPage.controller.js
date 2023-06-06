const qs = require('qs');
const BaseFunctionController = require('./BaseFunction.controller');
const HomestayModel = require('../model/Homestay.model');
const url = require("url");
const fs = require("fs");

class AdminPageController {

    static async getHomePage(req, res) {
        let homestayInfo = await HomestayModel.getAllHomestay();
        let newHtml = '';
        homestayInfo.forEach((homestay, index) => {
            newHtml += '<tr>';
            newHtml += `<td>${index + 1}</td>`;
            newHtml += `<td><a href="/detail?id=${homestay.hsID}">${homestay.hsName}</a></td>`;
            newHtml += `<td>${homestay.city}</td>`;
            newHtml += `<td>${homestay.price}</td>`;
            newHtml += `<td><a href="/edit?id=${homestay.hsID}"><button type="button" class="btn btn-primary">Sửa</button></a></td>`
            newHtml += `<td><a href="delete?id=${homestay.hsID}"><button type="button" class="btn btn-primary">Xóa</button></a></td>`
        });
        let html = await BaseFunctionController.readFileHTML('./src/views/homePage.html');
        html = html.replace('{info}', newHtml)
        res.writeHead(200, {'Context-type': 'text/html'});
        res.write(html);
        res.end();
    }

    static async getNotFoundPage(req, res) {
        let html = await BaseFunctionController.readFileHTML('./src/views/notFoundPage.html');
        res.writeHead(200, {'Context-type': 'text/html'});
        res.write(html);
        res.end();
    }

    static async getHomestayDetailPage(req, res) {
        let hsID = qs.parse(url.parse(req.url).query).id;
        let result = await HomestayModel.getHomestayByHsID(hsID);
        let homestayDetail = result[0];
        let html = await BaseFunctionController.readFileHTML('./src/views/homestayDetail.html');
        html = html.replace('{hsName}', homestayDetail.hsName);
        html = html.replace('{city}', homestayDetail.city);
        html = html.replace('{bedroomNumber}', homestayDetail.bedroomNumber);
        html = html.replace('{toiletNumber}', homestayDetail.toiletNumber);
        html = html.replace('{price}', homestayDetail.price);
        html = html.replace('{describer}', homestayDetail.describer);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }

    static async handleAddHomestayPage(req, res) {
        if (req.method === 'GET') {
            let html = await BaseFunctionController.readFileHTML('./src/views/addHomestay.html');
            res.writeHead(200, {'Context-type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });

            req.on('end', async () => {
                try {
                    let homestayInfoAdded = qs.parse(data);
                    let {hsName, city, bedroomNumber, price, toiletNumber, describer} = homestayInfoAdded;
                    await HomestayModel.addHomestay(hsName, city, bedroomNumber, price, toiletNumber, describer);
                    res.writeHead(301, {Location: '/'});
                    res.end();
                } catch (err) {
                    console.log(err.message);
                }
            });
        }
    }

    static async handleEditHomestayPage(req, res) {
        if (req.method === 'GET') {
            let html = await BaseFunctionController.readFileHTML('./src/views/editHomestay.html');
            let hsID = qs.parse(url.parse(req.url).query).id;
            let result = await HomestayModel.getHomestayByHsID(hsID);
            let homestayDetail = result[0];
            let {hsName, city, bedroomNumber, price, toiletNumber, describer} = homestayDetail;
            html = html.replace('{hsName}', hsName);
            html = html.replace('{city}', city);
            html = html.replace('{bedroomNumber}', bedroomNumber);
            html = html.replace('{toiletNumber}', toiletNumber);
            html = html.replace('{price}', price);
            html = html.replace('{describer}', describer);
            res.writeHead(200, {'Context-type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });

            req.on('end', async () => {
                let hsID = qs.parse(url.parse(req.url).query).id;
                let homestayInfoAdded = qs.parse(data);
                let {hsName, city, bedroomNumber, price, toiletNumber, describer} = homestayInfoAdded;
                await HomestayModel.updateHomestayByCourseID(hsName, city, bedroomNumber, price, toiletNumber, describer, hsID)
                res.writeHead(301, {Location: '/'});
                res.end();
            });
        }
    }

}

module.exports = AdminPageController;
