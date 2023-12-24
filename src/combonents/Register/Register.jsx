
import { useFormik } from 'formik'
import Navbar from '../navbar/Navbar'

// library => Formic =>zakriha ya mona mn el doc

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
// add ui => think STATE  => rerender



export default function Register(pr) {

  console.log('r');
  let user = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: ''
  }

  //=========
  const [errmsg, seterrmsg] = useState(null)
  const [msgSucsses, setmsgSucsses] = useState(null)
  const navigaeUser = useNavigate();  // to navigate user to another page
  const [loading, setloading] = useState(false)

  //===========

  async function register(values) {

    setloading(true);
    //******************************************* */
    // 1-
    // console.log('submit', values);
    // const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    // .catch(function (er) {
    //   console.log('errot in api signup',er);
    // })
    // console.log(data);

    //******************************************* */
    //  2-
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      console.log(data.message);
      setmsgSucsses(data.message);
      seterrmsg(null);
      setTimeout(() => {
        navigaeUser('/login')

      }, 1000);
    }
    catch (error) {
      console.log('error in api => ', error.response.data.message);
      seterrmsg(error.response.data.message)
      setmsgSucsses(null);
    }
    //******************************************* */
    setloading(false)



  }

  const formicObject = useFormik({
    initialValues: user,
    onSubmit: register,
    validate: function (values) {  // call befor submite
      //errors => prevent submit
      const errors = {};
      // console.log(values);

      // const regexPhone=/^(02)?01[0125][0-9]{8}$/
      if (values.name.length < 4 || values.name.length > 10) {
        errors.name = "name must be at least 4 charcers to 10"
      }
      if (values.email.includes('@') === false || values.email.includes('.') === false) {
        errors.email = "email invalid"
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = "phone invalid"
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "password invalid"
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "repassword invalid"
      }











      return errors;
    }


  })


  // console.log(pr);


  return <>

    <Helmet>
    <meta charSet="utf-8" />
    <title>All Orders</title>

  </Helmet>

    <div>
      {/* null =  aflse */}

      <div className="w-75 m-auto pt-5 ">
        {errmsg ? <div className="alert alert-danger">email already exist</div> : ''}


        {msgSucsses ? <div className="alert alert-info">{msgSucsses}</div> : ''}



        <form onSubmit={formicObject.handleSubmit}  >
          <label htmlFor="name">name</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} value={formicObject.values.name} id='name' type="text" placeholder='enter name' className='form-control mb-3' />
          {formicObject.errors.name && formicObject.touched.name ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.name}

          </div> : ''}




          <label htmlFor="email">email</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} value={formicObject.values.email} id='email' type="text" placeholder='enter email' className='form-control mb-3' />
          {formicObject.errors.email && formicObject.touched.email ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.email}

          </div> : ''}
          <label htmlFor="phone">phone</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} id='phone' type="tel" placeholder='enter phone' className='form-control mb-3' />
          {formicObject.errors.phone && formicObject.touched.phone ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.phone}

          </div> : ''}
          <label htmlFor="password">password</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} value={formicObject.values.password} id='password' type="password" placeholder='enter password' className='form-control mb-3' />

          {formicObject.errors.password && formicObject.touched.password ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.password}

          </div> : ''}
          <label htmlFor="rePassword">repassword</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} value={formicObject.values.rePassword} id='rePassword' type="password" placeholder='enter repassword' className='form-control mb-3' />
          {formicObject.errors.rePassword && formicObject.touched.rePassword ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.rePassword}
          </div> : ''}

          <button type='submit' disabled={formicObject.isValid == false || formicObject.dirty == false}
            className='btn btn-success'>   {loading ? <Circles
              height="50"
              width="50"
              color="#09c"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> : 'Register'}</button>

        </form>
      </div>
    </div>
    </>
  //disabled={formicObject.isValid==false || formicObject.dirty==false}
}

