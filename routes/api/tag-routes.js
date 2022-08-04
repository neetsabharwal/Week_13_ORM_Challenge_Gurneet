const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // include its associated Product data
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product',
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
  // find a single tag by its `id`
  Tag.findOne({
    // include its associated Product data
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product',
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
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then((dbUserData) => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbUserData)=> res.json(dbUserData))
  .catch((err)=>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
