import React from 'react'
import {Container, Typography, Grid, Button} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'
import red from '@material-ui/core/colors/red';




const Cart = ({cart, handleEmptyCart, handleUpdateCartQty, handleRemoveFromCart }) => {
   const classes = useStyles();
   const primary = red[500]; // #F44336
   
  const EmptyCart = () => (
    <Typography variant= 'subtitle1'>You have no items in shopping cart, 
        <Link to="/" className={classes.link}>start adding some!</Link>
     </Typography>
  )
  const FilledCart = () => (
    
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) =>(
          <Grid item xs={12} sm={4} key={item.id}>
            <div><CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/></div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>SubTotal: {cart.subtotal.formatted}</Typography>
        <div >
          <Button className={classes.EmptyButton} size="large" type="button" variant="container" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
          <Button component={Link} to='/checkout' className={classes.EmptyButton} size="large" type="button" variant="container" color="primary">Check out</Button>
        </div>
      </div>
    </>
  )

  if (!cart.line_items) return 'loading...' 

  return (
      <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant ='h3' gutterBottom>Your shopping cart</Typography>
        { !cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
      </Container>
    
  )
}

export default Cart