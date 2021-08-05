const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }
  })
  .then(categoryDB=> res.json(categoryDB))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    },
    where: {
      id: req.params.id
    },
  })
  .then(categoryDB => {
    if (!categoryDB){
      res.status(404).json({ message: "No matching data found with this id"});
    }
    res.json(categoryDB);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(categoryDB => res.json(categoryDB))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
      where: {
        id: req.params.id
      },
      category_name: req.body.category_name
    }
  )
  .then(categoryDB => {
    if (!categoryDB){
      res.status(404).json({ message: "No matching data found with this id"});
    }
    res.json(categoryDB);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryDB => {
    if (!categoryDB){
      res.status(404).json({ message: "No matching data found with this id"});
    }
    res.json(categoryDB);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
