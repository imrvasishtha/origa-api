const Users = require("../models/users");


/*fetch users orders details */
const ordersDetails = (req, res) => {
    try {
        /*handle Error*/
        const handleError = (message, statusCode) => {
            return res.status(statusCode).send({
                message: message
            })
        }

        /*joining orders and users collections */
        Users.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'orderdetails'
                }
            },
            {
                $project: {
                    "_id": 0,
                    "userId": 1,
                    "name": 1,
                    "orderdetails.subtotal": 1
                }
            }
        ], (err, users) => {
            /*handling error while fetching joined data */
            if (err) return handleError("Error while fetching data", 404);


            /*handling average and no of orders */
            new Promise((resolve, reject) => {
                users.forEach((ele) => {
                    ele.noOfOrders = ele.orderdetails.length;
                    let sum = 0; //calculating sum
                    let i = 1; //calculating nooforders => index+1
                    ele.orderdetails.forEach((od, index) => {
                        sum = sum + od.subtotal;
                        i = index + 1; //index start from zero
                    })

                    ele.averageBillValue = isNaN(sum / i) ? handleError("error while summing", 404) : (sum / i);
                    /*deleting order details */
                    delete ele.orderdetails;
                });
                resolve();
            }).then(() => {
                /*returing return as an array */
                return res.status(200).send(
                    users
                )
            }).catch((err) => {
                /*catch error if there is some error */
                return handleError("Error while making average", 404);
            })
        });


    } catch (err) {
        /*retunring api errors */
        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }
}

/*update user orders details */
const updateOrders = (req, res) => {
    try {
        /*handle Error*/
        const handleError = (message, statusCode) => {
            return res.status(statusCode).send({
                message: message
            })
        }

        /*joining orders and users collections */
        Users.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'orderdetails'
                }
            },
            {
                $project: {
                    "_id": 0,
                    "userId": 1,
                    "name": 1,
                    "orderdetails.subtotal": 1
                }
            }
        ], (err, users) => {
            /*handling error while fetching joined data */
            if (err) return handleError("Error while fetching data", 404);


            /*handling average and no of orders */
            new Promise((resolve, reject) => {
                users.forEach((ele) => {
                    ele.noOfOrders = ele.orderdetails.length;

                    /*updating users orders numbers */
                    Users.updateMany({ userId: ele.userId }, { $set: { NoofOrders: ele.noOfOrders } }, (err, orders) => {
                        /*handling error while fetching joined data */
                        if (err) return handleError("Error while fetching data", 404);
                    });
                });
                resolve();
            }).then(() => {
                /*returing return as an array */
                return res.status(200).send({
                    success: true,
                    message: "Successfully updated"
                })
            }).catch((err) => {
                /*catch error if there is some error */
                return handleError("Error while making average", 404);
            })
        });


    } catch (err) {
        /*retunring api errors */
        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }
}


module.exports = {
    ordersDetails,
    updateOrders
}