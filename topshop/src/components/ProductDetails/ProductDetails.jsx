import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../Header/Header'
import { ProductService } from '../Services/ProductService'
import './ProductDetails.css'
import { CheckIcon, ImagePlaceholder, MinusIcon, PlusIcon } from '../../assets/icons'
import Footer from '../Footer/Footer'
import { useUser } from '../Context/UserContext'
import { useCart } from '../Context/CartContext'
import { Button, IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export default function ProductDetails() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [inCart, setInCart] = useState(false)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const inputRef = useRef()
    const [user, setUser] = useUser()
    const [cart, setCart] = useCart()



    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    const action = (
    <Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
        </Button>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </Fragment>
    );



    function autoResize(){
        inputRef.current.style.width = inputRef.current.value.length+'ch'
    }



    function addToCart() {

        if(!user) {
          handleClick()
          return
        }
    
        ProductService.addToCart(user.username, id, quantity, product.price)
        .then(
          axRes => {
            ProductService.getCart(user.username)
            .then(
              axRes => {
                // setInCart(true)
                setCart(axRes.data)
              }
            )
            .catch(
                axErr => console.log(axErr.response.data.details)
            )
          }
        ).catch(
          axErr => console.log(axErr.response.data.details)
        )
    }





    function deleteLp(){

        let lpId;
        if(cart){
          cart.forEach(
            lp => {
              if(lp.product.id == id){
                lpId = lp.id
              }
            }
          )
        }
        ProductService.deleteLp(lpId)
        .then(
            axRes => {
                const username = user ? user.username : "";
                ProductService.getCart(username)
                .then(
                    axRes => {
                        setInCart(false)
                        setCart(axRes.data)
                    }
                )
                .catch(
                    axErr => {
                        console.log(axErr.response.data.details)
                    }
                )
            }
        )
        .catch(
            axErr => console.log(axErr.response.data.details)
        )
    }




    useEffect(() => {
        if(cart){
          let exist = false
          cart.forEach(
            lp => {
              if(lp.product.id == id) {
                setInCart(true)
                exist = true
              }
            }
          )
          if(exist == false){
            setInCart(false)
          }
        }
    }, [cart])




    // INCREMENT PRODUCT VIEW COUNT
    useEffect(() => {

        ProductService.addView(id)
        .then(
            axRes => console.log("view added")
        )
        .catch(
            axErr => console.log(axErr.response.data.details)
        )
    }, [])



    // SET PRODUCT STATE
    useEffect(() => {
        ProductService.getProductById(id).then(
            axRes => setProduct(axRes.data)
        )
    }, [])

  return (
    <>
        <div className="global_wrapper product_details_page_wrapper">

            <Header />

            <div className="product_details_container">
                <div className="product_details_image_display">

                    <img 
                        className='product_details_main_image' 
                        src={product ? product.image && `data:image/png;base64,${product.image.imageData}` : ""}
                        alt="" 
                    />

                    <img 
                        className='product_details_secondary_image' 
                        src="/src/assets/images/Gaming.png"
                        alt="" 
                    />

                    <img 
                        className='product_details_secondary_image' 
                        src="/src/assets/images/Gaming.png"
                        alt="" 
                    />

                    <img 
                        className='product_details_secondary_image' 
                        src="/src/assets/images/Gaming.png"
                        alt="" 
                    />

                    <img 
                        className='product_details_secondary_image' 
                        src="/src/assets/images/Gaming.png"
                        alt="" 
                    />
                </div>
                <div className="product_details_details">

                    <h1 className="product_details_title">{product && product.label}</h1>
                    <p className="product_details_owner">{product && product.owner.username}</p>
                    <div className="product_details_reviews">reviews placeholder</div>
                    <div className="product_details_quantity">

                        <span>Quantity</span>
                        <div className="product_details_quantity_controller">
                            <i 
                                onClick={
                                    (e) => {
                                        if(quantity == 1) return null;
                                        setQuantity(value => --value)
                                        autoResize()
                                    }}
                            >
                                {MinusIcon}
                            </i>
                            <input 
                                className='quantity_input'
                                type="number" 
                                value={quantity}
                                ref={inputRef}
                                style={{width: "1ch"}}
                                onChange={e => {
                                    if(!e.target.value || e.target.value == 0) {
                                        setQuantity(1)
                                        return
                                    }
                                    setQuantity(e.target.value)
                                    autoResize()
                                }}
                            />
                            <i 
                                onClick={
                                    (e) => {
                                        setQuantity(value => ++value)
                                        autoResize()
                                    }}>
                                {PlusIcon}
                            </i>
                        </div>
                    </div>
                    <h1 className="product_details_price"><sup>$</sup>{product && product.price}</h1>
                    <p className="product_details_description">{product && product.description}</p>
                    <div className="product_details_buttons">

                        {inCart ? (<Link onClick={deleteLp} className='add_to_cart_added'>{CheckIcon}</Link>) :
                        (<Link onClick={addToCart} className='add_to_cart'>Add to cart</Link>)}

                        <button 
                        onClick={(e) => navigate('/checkout', {
                            state: {
                                type: "unique", 
                                pid: id, 
                                quantity: quantity
                            }
                        })
                        } 
                        className='buy_now'>
                            Buy now
                        </button>

                    </div>
                </div>
            </div>
            <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Please login"
            action={action}
            />
        </div>
        <Footer/>
    </>
  )
}
