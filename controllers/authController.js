const router = require('express').Router();
const {body, validationResult} = require('express-validator')


router.get('/register', (req,res)=>{
    res.render('register');
});

router.post(
    '/register',
    body('username').isLength({min:3}),//TODO change acording requirments
    body('rePass').custom((value,{req})=>{
        if(value != req.body.password){
            throw new Error('Passwords don\'t match!');
        }
        return true;
    }),
(req,res)=>{
    console.log(req.body);
    const errors=  validationResult(req);
    console.log(errors);
    res.redirect('/auth/register')
});

router.get('/login', (req,res)=>{
    res.render('login');
});

router.post('/login', (req,res)=>{
    console.log(req.body);
});


module.exports = router;