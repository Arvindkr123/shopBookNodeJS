const path = require('path');
const fs = require('fs');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    let p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'product.json'
    );
    fs.readFile(p, (err, pageContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(pageContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    let p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'product.json'
    );
    fs.readFile(p, (err, pageContent) => {
      if (err) {
        return callback([]);
      }
      return callback(JSON.parse(pageContent));
    });
  }
};
