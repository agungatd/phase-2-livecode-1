var Product=require('../model/product')

module.exports = {
    isValidProduct(req, res, next) {
        Product.findOne({_id: req.params.id})
            .then(data => {
                if (data!=null) {
                    next()
                } else {
                    res.status(500).json('maaf barang tidak terdaftar')
                }
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
    }
}