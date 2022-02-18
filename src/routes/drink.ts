import express, {Request, Response, NextFunction, query}  from 'express';
import axios from 'axios';
import {  Drink, drinksResponce  } from '../models/drink';
import conn from '../mysql';
let router = express.Router();
conn;

const drinksArray:drinksResponce[]=[];
let drinksArray2:any;
let drinksArray3=Array();
let drinksArray4:drinksResponce[]=[];




export const getData = async()=>{
  const lett = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z'];
  for (let i = 0; i <= lett.length; i++) {
  const {data}= await axios.get<drinksResponce>(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${lett[i]}`);

  if(data === undefined){
   continue
  }else{
    
    drinksArray.push(data)
  }
  }
    console.log( drinksArray)
    return drinksArray;
}



  
});

let sql=`INSERT INTO cocktailDB.drinks(
  idDrink ,strDrink , strDrinkAlternate,  strTags ,strVideo, strCategory, strIBA, strAlcoholic, strGlass, strInstructions, strInstructionsES,  
  strInstructionsDE, strInstructionsFR, strInstructionsIT, strDrinkThumb, strIngredient1, strIngredient2, strIngredient3,
  strIngredient4, strIngredient5, strIngredient6, strIngredient7, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7,
  strImageSource, strImageAttribution, strCreativeCommonsConfirmed, dateModified ) VALUES(? , ?, ?, ?, ?, ? , ?, ?, ?, ?, ? , ?, ?, ?, ?, ? , ?, ?, ?, ?,? , ?, ?, ?, ?, ? , ?, ?, ?, ?,? ,?,?)
  ON DUPLICATE KEY UPDATE idDrink= VALUES(idDrink), strDrink=VALUES(strDrink),strDrinkThumb= VALUES(strDrinkThumb)
`;

const filter=(property:string)=>{
 return `SELECT * FROM cocktailDB.drinks WHERE ${property} =?`
   
}

const countRows=(()=> {
  let result:Number=0;
  conn.query("SELECT COUNT (idDrink) FROM cocktailDB.drinks",  (err: any,rows:number)=>{
    if(err) throw err;
    result=rows;
  })
  return result;
});

let drinksID=(()=>{
  let result:number[]=[];
  conn.query("SELECT idDrink FROM cocktailDB.drinks",  (err: any,rows)=>{
    if(err) throw err;
    result.push(rows);
  })
  return result;
});

let drinkKeys=(()=>{
  let result=Array();
  conn.query("SELECT strDrink, strDrinkThumb FROM cocktailDB.drinks",  (err: any,rows)=>{
    if(err) throw err;
    if(rows!==undefined){
      result.push(rows);
    }

  })
    return result;
});



//get all drinks
router.get('/', async(_, res:Response)=>{
  conn.query(`SELECT * FROM cocktailDB.drinks`, (err: any, drinks: drinksResponce[])=>{
    if(err) throw err;
    console.log('200 ok');
    res.json(drinks);
});
});



  //get drinks where like true
  router.get('/drink',({query:{like}}, res)=>{
    let result:drinksResponce;
    like && (conn.query(filter('is_like'),like, (err, drinks:drinksResponce)=>{
      if(err) throw err; 
       drinks!==null ? res.json(drinks):res.status(204).json({err:204, message: 'No content'}) }));
  })




//get drink base idDrink,strDrink, strCategory, strAlcoholic, strIngredient 
  router.get('/drink', ({query:{idDrink,strDrink, strCategory, strAlcoholic, strIngredient }}, res)=>{
    let filteredDrinks=Array();
      idDrink && (conn.query(filter('idDrink'),idDrink, (err, drinks)=>{
      if(err) throw err;  filteredDrinks.push(drinks); filteredDrinks.length>0? res.json(filteredDrinks):res.status(404).json({err:404, message: 'drink with this info is not found'}) }));
      strDrink && (conn.query(filter('strDrink'),strDrink, (err, drinks)=>{
      if(err) throw err; filteredDrinks.push(drinks); filteredDrinks.length>0? res.json(filteredDrinks):res.status(404).json({err:404, message: 'drink with this info is not found'}) }));
      strCategory && (conn.query(filter('strCategory'),strCategory, (err, drinks)=>{
      if(err) throw err; filteredDrinks.push(drinks); filteredDrinks.length>0? res.json(filteredDrinks):res.status(404).json({err:404, message: 'drink with this info is not found'})}));
      strAlcoholic && (conn.query(filter('strAlcoholic'),strAlcoholic, (err, drinks)=>{
      if(err) throw err; filteredDrinks.push(drinks); filteredDrinks.length>0? res.json(filteredDrinks):res.status(404).json({err:404, message: 'drink with this info is not found'})}));
     if(strIngredient){
          (conn.query(`SELECT * FROM cocktailDB.drinks WHERE strIngredient1 =?`,strIngredient, (err, drinks)=>{
          if(err) throw err; filteredDrinks.push(drinks); filteredDrinks.length>0? res.json(filteredDrinks):res.status(404).json({err:404, message: 'drink with this info is not found'})}))
       }
     
  });


 //delete a drink base on id
  router.delete('/drink', ({query:{idDrink}}, res)=>{
    conn.query(`delete FROM cocktailDB.drinks WHERE idDrink=?`,idDrink,  (err: any, drink:Drink)=>{
       if(err) throw err;
       drink ? res.json({message: "drink deleted successfully"}) : 
       res.status(404).json({error: 404, message: "not found"});
   });
})

 //post a like
 router.post('/drink/like', ({query:{idDrink, like}}, res)=>{
   const isLike = like === '0' ? 1 : 0;
  conn.query(`UPDATE cocktailDB.drinks SET is_like=? WHERE idDrink=?`,[isLike, idDrink],  (err: any, drink:Drink)=>{
     if(err) throw err;
     res.json({message: "success"}) 
    });
})





  //post from API into database
  router.post('/', async(_, res) => {
      try {
          (await getData()).forEach((drinks)=>{
            if(drinks!==null){
              drinks.drinks.forEach((drinks)=>{
                    conn.query(sql,
                      [
                      drinks.idDrink, drinks.strDrink, drinks.strDrinkAlternate, drinks.strTags,
                      drinks.strVideo, drinks.strCategory, drinks.strIBA, drinks.strAlcoholic, drinks.strGlass,
                      drinks.strInstructions, drinks.strInstructionsES, drinks.strInstructionsDE, drinks.strInstructionsFR, drinks.strInstructionsIT, drinks.strDrinkThumb,
                      drinks.strIngredient1, drinks.strIngredient2, drinks.strIngredient3, drinks.strIngredient4, drinks.strIngredient5,drinks.strIngredient6, drinks.strIngredient7, 
                      drinks.strMeasure1, drinks.strMeasure2, drinks.strMeasure3, drinks.strMeasure4, drinks.strMeasure5,drinks.strMeasure6, drinks.strMeasure7,
                      drinks.strImageSource, drinks.strImageAttribution, drinks.strCreativeCommonsConfirmed, drinks.dateModified
                    ], function (err: any, result:drinksResponce[]) {
                      if (err){
                        throw {message: err};
                      }else if(result.length===countRows()){
                        return
                      }else{
                        drinksArray2.push(drinks);
                      }
                    });
              })
            }
          }) 
      }catch (err) {
        console.log("qui")
          res.status(500).json({ message: err });
          
      }
      if(drinksArray2.length===countRows() || countRows()>drinksArray2.length){
        console.log('no new row inserted because data already exist');
        res.json({message:'no new row inserted because data already exist'});
      }else if (drinksArray2.length>countRows()){
        console.log('new row inserted and others updated', drinksArray2);
        res.json({message:'new row inserted and others updated', drinksArray2});
      }
    });


    
     //add data into database throught a form
    router.post('/drink', ({body} ,res)=>{
      let currentDateTime = new Date();
      let getRandomArbitrary=(()=>{
        let result= Math.ceil(Math.random() * (17841-1) + 1);
        do{
          Math.random() * (1 - 17841) + 1;
        }while(drinksID().includes(result))
        return result;
      })
  
      let  drink:Drink= {
        ...body,
        idDrink: getRandomArbitrary().toString(),
        dateModified: `${currentDateTime.toISOString().slice(0,10)} Ore: ${currentDateTime.getHours().toString()} ${currentDateTime.getMinutes().toString()}` //`${currentDay.getFullYear()}/${currentDay.getMonth()}/${currentDay.getDate()} ${currentDay.getHours()}:${currentDay.getMinutes()}:${currentDay.getSeconds()}`
      };
    
      try {
        /*conn.query(`SELECT strDrink, strDrinkThumb FROM cocktailDB.drinks WHERE strDrink='${drink.strDrink}' AND strDrinkThumb='${drink.strDrinkThumb}' LIMIT 1`, (err: any,rows)=>{
          if(err)throw err;
          if(){
            res.json({message:'I\'m sorry but drink already exist in my database! try another one'})
          }else{*/
            conn.query(sql,[
              drink.idDrink, drink.strDrink, drink.strDrinkAlternate, drink.strTags,
              drink.strVideo, drink.strCategory, drink.strIBA, drink.strAlcoholic, drink.strGlass,
              drink.strInstructions, drink.strInstructionsES, drink.strInstructionsDE, drink.strInstructionsFR, drink.strInstructionsIT, drink.strDrinkThumb,
              drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7,
              drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7,
              drink.strImageSource, drink.strImageAttribution, drink.strCreativeCommonsConfirmed, drink.dateModified
    
             ],   function (err: any, result) {
              if (err){
                throw {message: err};
              } else if(result.affectedRows>1){
                res.json({message:'I\'m sorry but drink already exist in my database! try another one'})
              }else{
                console.log({result});
                res.json({result});
              }
            });
       
    }catch (err) {
        res.status(500).json({ message: err });
    }
   });
      



  export default router;