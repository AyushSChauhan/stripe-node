const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
 
var Publishable_Key = 'pk_test_51MQpkBSHfIuHuQpJ4GLlLEDIRnReEU0GRerftoUdsfckBmkQIGC6CTMI1FpzuKUHiRmHRZhvG7SeMXHu6frBFq3b00mu3mhGQ6'
var Secret_Key = 'sk_test_51MQpkBSHfIuHuQpJ3zeHJ6Vw8uSdwUOU9zMu1KOlRRlakoMgGvhd68jHSljg92AsOeA0RbU382lJJdC8CBuDaPCZ00OUfIPHkf'
 
const stripe = require('stripe')(Secret_Key)
 
const port = process.env.PORT || 3000
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('home', {
       key: Publishable_Key
    })
})
 
app.post('/payment',async function(req, res){
 console.log(req.body);
    
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Ayush S Chauhan',
    })
    .then((customer) => {
        console.log("stripeToken", req.body.stripeToken);
        return stripe.paymentIntents.create({
          amount: 2500,
          currency: "INR",
          payment_method_types: ["card"],
          customer: customer.id,
         // payment_method:null
        });
      })
      .then((charge) => {
        res.send("Success"); // If no error occurs
      })
      .catch((err) => {
        res.send(err); // If some error occurs
      });
})
 
app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})