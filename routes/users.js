var express = require('express');
var router = express.Router();
const UserControllers = require("../controllers/users");

/* GET orders listing. */
router.get("/ordersDetails", UserControllers.ordersDetails);

/*Update orders details */
router.put("/updateOrders", UserControllers.updateOrders);

module.exports = router;
