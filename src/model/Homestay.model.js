let DatabaseModel = require('./Database.model');

class HomestayModel extends DatabaseModel {
    static async getAllHomestay() {
        let sql = 'select * from homestayInfo;';
        return await DatabaseModel.querySql(sql);
    }

    static async getHomestayByHsID(hsID) {
        let sql = `select * from homestayInfo where hsID = ${hsID};`;
        return await DatabaseModel.querySql(sql);
    }

    static async addHomestay(hsName, city, bedroomNumber, price, toiletNumber, describer) {
        let sql = `insert into homestayInfo (hsName, city, bedroomNumber, price, toiletNumber, describer) values  ('${hsName}', '${city}', ${bedroomNumber}, ${price}, ${toiletNumber}, '${describer}');`;
        await DatabaseModel.querySql(sql);
    }

    static async updateHomestayByCourseID(hsName, city, bedroomNumber, price, toiletNumber, describer, hsID) {
        let sql = `UPDATE homestayInfo SET hsName = '${hsName}', city = '${city}', bedroomNumber = '${bedroomNumber}', price = '${price}', toiletNumber = '${toiletNumber}', describer = '${describer}' WHERE hsID = '${hsID}';`;
        await DatabaseModel.querySql(sql);
    }

    static async deleteHomestayID(hsID) {
        let sql = `delete from homestayInfo where hsID = ${hsID};`;
        await DatabaseModel.querySql(sql);
    }

}

module.exports = HomestayModel;