const router = require("express").Router();
const Product = require("../models/Product.model");

// create the main products route (list)
router.get("/", (req, res, next) => {
    Product.find()
     .then((data) => res.json(data))
     .catch((err) => next(err));
  });

// create the add products route
router.post("/create", (req, res, next) => {
    const {title, productImage, description, pricePolicy, price, /* createdBy_id, */ hobbyRelated_id, charity_id} = req.body;
    Product.create({title, productImage, description, pricePolicy, price, /* createdBy_id, */ hobbyRelated_id, charity_id})
    .then((data) => res.json(data))
    .catch((err) => {next(err)});
})

// create the detailed products route
router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

// create the edit products route
router.patch("/:id", (req, res, next) => {
    const {title, productImage, description, pricePolicy, price, /* createdBy_id, */ hobbyRelated_id, charity_id} = req.body;
    Product.findByIdAndUpdate(
    req.params.id,
    {title, productImage, description, pricePolicy, price, /* createdBy_id, */ hobbyRelated_id, charity_id} ,
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// create the delete products route
// after deleting the charity => redirect to Products list ("/") ?
router.delete("/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then((data) => res.json(data._id))
      .catch((err) => next(err));
  });



module.exports = router;