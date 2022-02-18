"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var mysql_1 = __importDefault(require("../mysql"));
var router = express_1.default.Router();
mysql_1.default;
var drinksArray = [];
var drinksArray2;
var drinksArray3 = Array();
var drinksArray4 = [];
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lett, i, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lett = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i <= lett.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios_1.default.get("https://thecocktaildb.com/api/json/v1/1/search.php?f=" + lett[i])];
            case 2:
                data = (_a.sent()).data;
                if (data === undefined) {
                    return [3 /*break*/, 3];
                }
                else {
                    drinksArray.push(data);
                }
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(drinksArray);
                return [2 /*return*/, drinksArray];
        }
    });
}); };
exports.getData = getData;
(0, exports.getData)();
var sql = "INSERT INTO cocktailDB.drinks(\n  idDrink ,strDrink , strDrinkAlternate,  strTags ,strVideo, strCategory, strIBA, strAlcoholic, strGlass, strInstructions, strInstructionsES,  \n  strInstructionsDE, strInstructionsFR, strInstructionsIT, strDrinkThumb, strIngredient1, strIngredient2, strIngredient3,\n  strIngredient4, strIngredient5, strIngredient6, strIngredient7, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7,\n  strImageSource, strImageAttribution, strCreativeCommonsConfirmed, dateModified ) VALUES(? , ?, ?, ?, ?, ? , ?, ?, ?, ?, ? , ?, ?, ?, ?, ? , ?, ?, ?, ?,? , ?, ?, ?, ?, ? , ?, ?, ?, ?,? ,?,?)\n  ON DUPLICATE KEY UPDATE idDrink= VALUES(idDrink), strDrink=VALUES(strDrink),strDrinkThumb= VALUES(strDrinkThumb)\n";
var filter = function (property) {
    return "SELECT * FROM cocktailDB.drinks WHERE " + property + " =?";
};
var countRows = (function () {
    var result = 0;
    mysql_1.default.query("SELECT COUNT (idDrink) FROM cocktailDB.drinks", function (err, rows) {
        if (err)
            throw err;
        result = rows;
    });
    return result;
});
var drinksID = (function () {
    var result = [];
    mysql_1.default.query("SELECT idDrink FROM cocktailDB.drinks", function (err, rows) {
        if (err)
            throw err;
        result.push(rows);
    });
    return result;
});
var drinkKeys = (function () {
    var result = Array();
    mysql_1.default.query("SELECT strDrink, strDrinkThumb FROM cocktailDB.drinks", function (err, rows) {
        if (err)
            throw err;
        if (rows !== undefined) {
            result.push(rows);
        }
    });
    return result;
});
//get all drinks
router.get('/', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mysql_1.default.query("SELECT * FROM cocktailDB.drinks", function (err, drinks) {
            if (err)
                throw err;
            console.log('200 ok');
            res.json(drinks);
        });
        return [2 /*return*/];
    });
}); });
//get drinks where like true
router.get('/drink', function (_a, res) {
    var like = _a.query.like;
    var result;
    like && (mysql_1.default.query(filter('is_like'), like, function (err, drinks) {
        if (err)
            throw err;
        drinks !== null ? res.json(drinks) : res.status(204).json({ err: 204, message: 'No content' });
    }));
});
//get drink base idDrink,strDrink, strCategory, strAlcoholic, strIngredient 
router.get('/drink', function (_a, res) {
    var _b = _a.query, idDrink = _b.idDrink, strDrink = _b.strDrink, strCategory = _b.strCategory, strAlcoholic = _b.strAlcoholic, strIngredient = _b.strIngredient;
    var filteredDrinks = Array();
    idDrink && (mysql_1.default.query(filter('idDrink'), idDrink, function (err, drinks) {
        if (err)
            throw err;
        filteredDrinks.push(drinks);
        filteredDrinks.length > 0 ? res.json(filteredDrinks) : res.status(404).json({ err: 404, message: 'drink with this info is not found' });
    }));
    strDrink && (mysql_1.default.query(filter('strDrink'), strDrink, function (err, drinks) {
        if (err)
            throw err;
        filteredDrinks.push(drinks);
        filteredDrinks.length > 0 ? res.json(filteredDrinks) : res.status(404).json({ err: 404, message: 'drink with this info is not found' });
    }));
    strCategory && (mysql_1.default.query(filter('strCategory'), strCategory, function (err, drinks) {
        if (err)
            throw err;
        filteredDrinks.push(drinks);
        filteredDrinks.length > 0 ? res.json(filteredDrinks) : res.status(404).json({ err: 404, message: 'drink with this info is not found' });
    }));
    strAlcoholic && (mysql_1.default.query(filter('strAlcoholic'), strAlcoholic, function (err, drinks) {
        if (err)
            throw err;
        filteredDrinks.push(drinks);
        filteredDrinks.length > 0 ? res.json(filteredDrinks) : res.status(404).json({ err: 404, message: 'drink with this info is not found' });
    }));
    if (strIngredient) {
        (mysql_1.default.query("SELECT * FROM cocktailDB.drinks WHERE strIngredient1 =?", strIngredient, function (err, drinks) {
            if (err)
                throw err;
            filteredDrinks.push(drinks);
            filteredDrinks.length > 0 ? res.json(filteredDrinks) : res.status(404).json({ err: 404, message: 'drink with this info is not found' });
        }));
    }
});
//delete a drink base on id
router.delete('/drink', function (_a, res) {
    var idDrink = _a.query.idDrink;
    mysql_1.default.query("delete FROM cocktailDB.drinks WHERE idDrink=?", idDrink, function (err, drink) {
        if (err)
            throw err;
        drink ? res.json({ message: "drink deleted successfully" }) :
            res.status(404).json({ error: 404, message: "not found" });
    });
});
//post a like
router.post('/drink/like', function (_a, res) {
    var _b = _a.query, idDrink = _b.idDrink, like = _b.like;
    var isLike = like === '0' ? 1 : 0;
    mysql_1.default.query("UPDATE cocktailDB.drinks SET is_like=? WHERE idDrink=?", [isLike, idDrink], function (err, drink) {
        if (err)
            throw err;
        res.json({ message: "success" });
    });
});
//post from API into database
router.post('/', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.getData)()];
            case 1:
                (_a.sent()).forEach(function (drinks) {
                    if (drinks !== null) {
                        drinks.drinks.forEach(function (drinks) {
                            mysql_1.default.query(sql, [
                                drinks.idDrink, drinks.strDrink, drinks.strDrinkAlternate, drinks.strTags,
                                drinks.strVideo, drinks.strCategory, drinks.strIBA, drinks.strAlcoholic, drinks.strGlass,
                                drinks.strInstructions, drinks.strInstructionsES, drinks.strInstructionsDE, drinks.strInstructionsFR, drinks.strInstructionsIT, drinks.strDrinkThumb,
                                drinks.strIngredient1, drinks.strIngredient2, drinks.strIngredient3, drinks.strIngredient4, drinks.strIngredient5, drinks.strIngredient6, drinks.strIngredient7,
                                drinks.strMeasure1, drinks.strMeasure2, drinks.strMeasure3, drinks.strMeasure4, drinks.strMeasure5, drinks.strMeasure6, drinks.strMeasure7,
                                drinks.strImageSource, drinks.strImageAttribution, drinks.strCreativeCommonsConfirmed, drinks.dateModified
                            ], function (err, result) {
                                if (err) {
                                    throw { message: err };
                                }
                                else if (result.length === countRows()) {
                                    return;
                                }
                                else {
                                    drinksArray2.push(drinks);
                                }
                            });
                        });
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("qui");
                res.status(500).json({ message: err_1 });
                return [3 /*break*/, 3];
            case 3:
                if (drinksArray2.length === countRows() || countRows() > drinksArray2.length) {
                    console.log('no new row inserted because data already exist');
                    res.json({ message: 'no new row inserted because data already exist' });
                }
                else if (drinksArray2.length > countRows()) {
                    console.log('new row inserted and others updated', drinksArray2);
                    res.json({ message: 'new row inserted and others updated', drinksArray2: drinksArray2 });
                }
                return [2 /*return*/];
        }
    });
}); });
//add data into database throught a form
router.post('/drink', function (_a, res) {
    var body = _a.body;
    var currentDateTime = new Date();
    var getRandomArbitrary = (function () {
        var result = Math.ceil(Math.random() * (17841 - 1) + 1);
        do {
            Math.random() * (1 - 17841) + 1;
        } while (drinksID().includes(result));
        return result;
    });
    var drink = __assign(__assign({}, body), { idDrink: getRandomArbitrary().toString(), dateModified: currentDateTime.toISOString().slice(0, 10) + " Ore: " + currentDateTime.getHours().toString() + " " + currentDateTime.getMinutes().toString() //`${currentDay.getFullYear()}/${currentDay.getMonth()}/${currentDay.getDate()} ${currentDay.getHours()}:${currentDay.getMinutes()}:${currentDay.getSeconds()}`
     });
    try {
        /*conn.query(`SELECT strDrink, strDrinkThumb FROM cocktailDB.drinks WHERE strDrink='${drink.strDrink}' AND strDrinkThumb='${drink.strDrinkThumb}' LIMIT 1`, (err: any,rows)=>{
          if(err)throw err;
          if(){
            res.json({message:'I\'m sorry but drink already exist in my database! try another one'})
          }else{*/
        mysql_1.default.query(sql, [
            drink.idDrink, drink.strDrink, drink.strDrinkAlternate, drink.strTags,
            drink.strVideo, drink.strCategory, drink.strIBA, drink.strAlcoholic, drink.strGlass,
            drink.strInstructions, drink.strInstructionsES, drink.strInstructionsDE, drink.strInstructionsFR, drink.strInstructionsIT, drink.strDrinkThumb,
            drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7,
            drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7,
            drink.strImageSource, drink.strImageAttribution, drink.strCreativeCommonsConfirmed, drink.dateModified
        ], function (err, result) {
            if (err) {
                throw { message: err };
            }
            else if (result.affectedRows > 1) {
                res.json({ message: 'I\'m sorry but drink already exist in my database! try another one' });
            }
            else {
                console.log({ result: result });
                res.json({ result: result });
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.default = router;
