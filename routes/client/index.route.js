const homeRoutes = require("./home.route");
const productsRoutes = require("./products.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const chatRoutes = require("./chat.route");
const usersRoutes = require("./users.route");

const categoryMiddleware = require("../../middlewares/category.middleware");
const cartMiddleware = require("../../middlewares/cart.middleware");
const userMiddleware = require("../../middlewares/user.middleware");
const generalSettingMiddleware = require("../../middlewares/general-setting.middleware");
const userAuthenticationMiddleware = require("../../middlewares/user-authentication.middleware")

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.user);
    app.use(generalSettingMiddleware.generalSetting);

    app.use("/", homeRoutes);
    app.use("/products", productsRoutes);
    app.use("/search", searchRoutes);
    app.use("/cart", cartRoutes);
    app.use("/checkout", checkoutRoutes);
    app.use("/user", userRoutes);
    app.use("/chat",userAuthenticationMiddleware.requireAuth, chatRoutes);
    app.use("/users",userAuthenticationMiddleware.requireAuth, usersRoutes);

    // Middleware 404 put in after all route
     app.use((req, res) => {
        res.status(404).render('client/pages/error/404');
    });
};