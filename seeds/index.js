const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64c00999b97053c7252dd195',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic sint, eaque cumque odit quaerat laborum impedit iusto velit sapiente, qui necessitatibus reiciendis fugit molestias pariatur, consequuntur corrupti officiis quibusdam repudiandae!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsatfxydu/image/upload/v1691002317/YelpCamp/siajxajs1koytq8xazss.jpg',
                    filename: 'YelpCamp/siajxajs1koytq8xazss',
                },
                {
                    url: 'https://res.cloudinary.com/dsatfxydu/image/upload/v1691002320/YelpCamp/sdt5tmdbyijgjiqooh7b.jpg',
                    filename: 'YelpCamp/sdt5tmdbyijgjiqooh7b',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})