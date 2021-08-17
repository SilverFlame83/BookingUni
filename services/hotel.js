const Hotel = require('../models/Hotel');

async function createHotel(hotelData){
    const hotel = new Hotel(hotelData);
    console.log(hotel)
    await hotel.save();

    return hotel;
}

async function getAllHotels(){
    const hotels = await Hotel.find({}).lean();

    return hotels;
}

async function getHotelById(id){
    const hotel =await Hotel.findById(id).lean();

    return hotel;
}

async function editHotel(id, hotelData){
    const hotel =await Hotel.findById(id);

    hotel.name = hotelData.name,
    hotel.city = hotelData.city,
    hotel.rooms = Number(hotelData.rooms),
    hotel.imageUrl = hotelData.imageUrl

    return hotel.save();

}
module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    editHotel
}