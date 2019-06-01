const express = require('express')
const router = express.Router();

router.get('/', function(request, response) {
    response.render('periodic_table');
});

router.get('/atom/:atomic_number', function(request, response) {
    let atomic_number = request.params.atomic_number;
    response.render('atomic_view', {atomic_number: atomic_number});
});

module.exports = router;