var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const {sequelize} = require('./models');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

var app = express();

// CORS ayarları
app.use(cors({
    origin: 'http://localhost:5173', // React uygulamanızın adresi
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP yöntemleri
    credentials: true // Eğer kimlik doğrulama (cookies) gerekiyorsa true yapın
}));

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/images', express.static('images'));

// routes
const userRoutes = require("./routes/user.routes");
const showcaseRoutes = require("./routes/showcase.routes");
const userShowcaseRoutes = require("./routes/userShowcase.routes");
const authRoutes = require("./routes/auth.routes");
const listingRoutes = require("./routes/listing.routes");

app.use("/users", userRoutes);
app.use("/showcase", showcaseRoutes);
app.use("/userShowcase", userShowcaseRoutes);
app.use("/auth", authRoutes);
app.use("/listing", listingRoutes);


// Veritabanı bağlantısı
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = app;
