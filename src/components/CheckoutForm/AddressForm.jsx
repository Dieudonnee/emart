import React, {useState, useEffect} from 'react'
import { Grid, Typography, InputLabel, Select, MenuItem, Button} from '@material-ui/core'
import {Link} from "react-router-dom"
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './CustomTextField'
import red from '@material-ui/core/colors/red';

import {commerce} from '../../lib/commerce'
// import { ControlPointDuplicateOutlined } from '@material-ui/icons'

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    // const [shippingOptions, setShippingOptions] = useState([])
    // const [shippingOption, setShippingOption] = useState('')
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id:code, label:name}));
    const primary = red[500]; // #F44336

    const fetchShippingCountries = async(checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)       

        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListShippingSubdivisions(countryCode)
        
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
   
   

    useEffect (() =>{
        fetchShippingCountries(checkoutToken.id)
    },[])
    useEffect(() =>{
        if (shippingCountry) fetchSubdivisions (shippingCountry)
    }, [shippingCountry])

   

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
          <form onSubmit = {methods.handleSubmit((data) => next({...data, shippingCountry}))}>
              <Grid container spacing={3}>
                  <FormInput name="firstName" label="First name"/>
                  <FormInput name="lastName" label="Last name"/>
                  <FormInput name="address1" label="Address"/>
                  <FormInput name="email" label="Email"/>
                  <FormInput name="city" label="City"/>
                  <FormInput name="zip" label="ZIP / Postal code"/>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping Country</InputLabel>
                      <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                      {countries.map((country) => (

                          <MenuItem key={country.id} value={country.id}>
                              {country.label}
                          </MenuItem>
                      ))}
                      </Select>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping Subdivision</InputLabel>
                      <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                      {subdivisions.map((subdivision) => (
                          <MenuItem key={subdivision.id}>{subdivision.label}</MenuItem>
                      ))}
                      </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping options</InputLabel>
                      <Select value={} fullWidth onchange={}>
                          <MenuItem key={} value={}>
                              Select Me
                          </MenuItem>
                      </Select>
                  </Grid> */}
              </Grid>
              <br/>
              <div style={{display : 'flex', justifyContent : 'space-between'}}>
                  <Button component={Link} to="/cart" variant="outlined" >Back to cart</Button>
                  <Button type="submit" variant="contained" color="primary">Next</Button>
              </div>
          </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
