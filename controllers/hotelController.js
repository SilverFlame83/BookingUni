const router = require('express').Router();
const {isUser} = require('../middlewares/guards')
//const {getHotelById} = require('../middlewares/storage')

router.get('/create', isUser(),(req,res)=>{
    res.render('hotel/create')
});

router.post('/create', isUser(), async (req,res)=>{
    const hotelData = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        bookedBy: [],
        owner:req.user._id
    };

    try{
       await req.storage.createHotel(hotelData);

       res.redirect('/');
    }catch(err){
        console.log(err.message);
        let errors;
        if(err.errors){
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }

        const ctx = {
            errors: errors,
            hotelData: {
                name: req.body.name,
                city: req.body.city,
                imageURL: req.body.imageURL,
                rooms: req.body.rooms,
            }
        }

        res.render('hotel/create', ctx)
    }
});

router.get('/details/:id', async(req,res)=>{
    try{
        const hotel = await req.storage.getHotelById(req.params.id);
        hotel.hasUser = Boolean(req.user);
        hotel.isAuthor = req.user && req.user._id == hotel.owner;
        hotel.isBooked = req.user && hotel.bookedBy.find(x=>x._id == req.user._id);
       
        res.render('hotel/details', {hotel});
    }catch(err){
        console.log(err.message);
        //res.redirect('/404');
    }
});

module.exports = router;
