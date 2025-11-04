
const express = require('express');
const router = express.Router();
const { TopBar, TopbarPost, TopbarDelete, TopbarUpdate, TopBarGetWeb } = require('../Controller/Topbar/Topbar');
const { singupPost, singup } = require('../Controller/User/Singup');
const { Card, PostCard, DeleteCard } = require('../Controller/Card/Card');
const { Cardupload } = require('../Middelware/ImageUplode/CardImages');
const { Favourite, PostFavourite } = require('../Controller/Federated/Federated');
const { PostHeroBanner, HeroBanner, HeroBannerDelete, HeroBannerUpdate, GetHeroBanner } = require('../Controller/Hero/HeroBanner');
const { HeroUplode } = require('../Middelware/ImageUplode/HeroBanner');
const { Product, PostBestSeller, GetBestSeller, GetProduct, PostProduct, GetWebProduct } = require('../Controller/Product/Product');
const { ProductImageUplode } = require('../Middelware/ProductImage');
const { PostCategory, Category, CategoryDelete, CategoryUpdate, GetCategory } = require('../Controller/Category/Category');
const { CategoryUplode } = require('../Middelware/ImageUplode/CategoryImage');
const { PostProductType, ProductType, DeleteProductType, UpdateProductType, GetProductType } = require('../Controller/product-type/ProductType');
//topbar start 
router.get('/topbar',TopBar)
router.get('/web/topbar',TopBarGetWeb);
router.post('/post/topbar',TopbarPost)
router.delete('/delete/topbar/:id',TopbarDelete)
router.put('/update/topbar',TopbarUpdate)

//topbar end


//banner hero image api start
router.get('/banner',HeroBanner)
router.get('/web/banner',GetHeroBanner)
router.post('/post/banner',HeroUplode.single('image'),PostHeroBanner)
router.delete('/delete/banner/:id',HeroBannerDelete)
router.put('/update/banner',HeroUplode.single('image'),HeroBannerUpdate)
//banner hero image api end


//category section api start
router.get('/category',Category)
router.get('/web/category',GetCategory)
router.post('/post/category',CategoryUplode.single('image'),PostCategory)
router.delete('/delete/category/:id',CategoryDelete)
router.put('/update/category/:id',CategoryUplode.single('image'),CategoryUpdate)
//category section api end


//product type api start 
router.get('/product-type',ProductType)
router.get('/web/product-type',GetProductType)
router.post('/post/product-type',PostProductType)
router.delete('/delete/product-type/:id',DeleteProductType)
router.put('/update/product-type',UpdateProductType)
//product type api end 

//singin start
router.get('/singup',singup)
router.post('/post/singup' ,singupPost)
//singin end


// add to card start
router.get('/card',Card)
router.post('/post/card',PostCard)
router.delete('/delete/card/:id',DeleteCard)
// add to card end


// add to federated start
router.get('/favourite',Favourite)
router.post('/post/favourite',PostFavourite)
// add to federated end



//add best Seller product start
router.post('/post/product',ProductImageUplode.fields([
    {name:"subimage",maxCount:4}
]),PostProduct)
router.get('/product',GetProduct)
router.get('/web/product',GetWebProduct)
//add best Seller product end




module.exports = router;