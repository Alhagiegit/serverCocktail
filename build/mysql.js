"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var conn = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});
conn.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
var db = "CREATE DATABASE IF NOT EXISTS cocktailDB CHARACTER SET utf8";
conn.query(db, function (err) {
    if (err)
        throw { message: err };
    console.log("Database created");
});
var columns = "\n      id_num int NOT NULL AUTO_INCREMENT PRIMARY KEY, idDrink CHAR(10), strDrink CHAR(50) NOT NULL, strDrinkAlternate CHAR(10),  strTags CHAR(100),\n        strVideo VARCHAR(50), strCategory VARCHAR(50) NOT NULL, strIBA VARCHAR(50), strAlcoholic CHAR(50) NOT NULL,\n        strGlass VARCHAR(50), strInstructions TEXT, strInstructionsES VARCHAR(1000) NULL,  \n        strInstructionsDE VARCHAR(1000) NULL, strInstructionsFR VARCHAR(1000) NULL, strInstructionsIT TEXT,  \n         strDrinkThumb VARCHAR(500) NOT NULL, strIngredient1 CHAR(50) NOT NULL, strIngredient2 VARCHAR(50), strIngredient3 CHAR(100),\n        strIngredient4 VARCHAR(50), strIngredient5 VARCHAR(50), strIngredient6 CHAR(50) NULL, strIngredient7 CHAR(50) NULL,\n        strMeasure1 CHAR(50), strMeasure2 CHAR(50), strMeasure3 CHAR(50), strMeasure4 CHAR(50), strMeasure5 CHAR(50), strMeasure6 CHAR(50) NULL, strMeasure7 CHAR(50) NULL,\n        strImageSource CHAR(255) NULL, strImageAttribution CHAR(255), strCreativeCommonsConfirmed VARCHAR(5), dateModified CHAR(50),\n        CONSTRAINT PK_Drink UNIQUE ( IDDRINK ,strDrink, strDrinkThumb)\n ";
var table = "CREATE TABLE IF NOT EXISTS cocktailDB.drinks(" + columns + ")";
conn.query(table, function (err) {
    if (err)
        throw { message: err };
    console.log("Table created");
});
exports.default = conn;
