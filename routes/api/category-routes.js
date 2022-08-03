const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // included its associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    // included its associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
    where: {
      id: req.params.id
    }
  })
  .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((dbUserData)=>{
    if(!dbUserData[0]){
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(dbUserData)
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then((dbUserData)=>{
    res.json(dbUserData)
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
