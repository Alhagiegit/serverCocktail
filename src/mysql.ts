import mysql from "mysql";
var conn = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   port:8889,
   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
 });

 conn.connect(function(err:any) {
   if (err) throw err;
   console.log("Connected!");
 });

 let db=`CREATE DATABASE IF NOT EXISTS cocktailDB CHARACTER SET utf8`;
 conn.query(db ,function (err: String) {
   if (err) throw {message: err};
   console.log("Database created");
 }); 
 let columns=`
      id_num int NOT NULL AUTO_INCREMENT PRIMARY KEY, idDrink CHAR(10), strDrink CHAR(50) NOT NULL, strDrinkAlternate CHAR(10),  strTags CHAR(100),
        strVideo VARCHAR(50), strCategory VARCHAR(50) NOT NULL, strIBA VARCHAR(50), strAlcoholic CHAR(50) NOT NULL,
        strGlass VARCHAR(50), strInstructions TEXT, strInstructionsES VARCHAR(1000) NULL,  
        strInstructionsDE VARCHAR(1000) NULL, strInstructionsFR VARCHAR(1000) NULL, strInstructionsIT TEXT,  
         strDrinkThumb VARCHAR(500) NOT NULL, strIngredient1 CHAR(50) NOT NULL, strIngredient2 VARCHAR(50), strIngredient3 CHAR(100),
        strIngredient4 VARCHAR(50), strIngredient5 VARCHAR(50), strIngredient6 CHAR(50) NULL, strIngredient7 CHAR(50) NULL,
        strMeasure1 CHAR(50), strMeasure2 CHAR(50), strMeasure3 CHAR(50), strMeasure4 CHAR(50), strMeasure5 CHAR(50), strMeasure6 CHAR(50) NULL, strMeasure7 CHAR(50) NULL,
        strImageSource CHAR(255) NULL, strImageAttribution CHAR(255), strCreativeCommonsConfirmed VARCHAR(5), dateModified CHAR(50),
        CONSTRAINT PK_Drink UNIQUE ( IDDRINK ,strDrink, strDrinkThumb)
 `
 var table =`CREATE TABLE IF NOT EXISTS cocktailDB.drinks(${columns})`;

 conn.query(table, function (err: any) {
   if (err) throw {message: err};
   console.log("Table created");
 });


 export default  conn;

