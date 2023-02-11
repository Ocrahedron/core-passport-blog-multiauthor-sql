const router = require('express').Router();

const {
  entryFindAllController, entryAddController, entryButtonController, entryShowNewBlockController,
  entryEditFetchController, entryDeleteFetchController, entryEditController, entryAllBlocksByUser
} = require('../controllers/entryController');

const { isAuth } = require('../middlewares/functs');

router
  .route('/')
  .get(entryFindAllController)
  .post(isAuth, entryAddController);
// router.get('/', entryFindAllController); // главная страница
// router.post('/', isAuth, entryAddController); // на главной странице открыть страницу для добавления новой записи

router.get('/new', isAuth, entryButtonController); // добавить новый блок
router.get('/:id', isAuth, entryShowNewBlockController); // показывает новый блок на новой странице
router.put('/:id', isAuth, entryEditFetchController); // редакитрует блок через фетч
router.delete('/:id', isAuth, entryDeleteFetchController); // удаляет блок через фетч
router.get('/:id/edit', isAuth, entryEditController); // реадуктирует блок по обычному
router.get('/:id/entries', entryAllBlocksByUser)


module.exports = router;
