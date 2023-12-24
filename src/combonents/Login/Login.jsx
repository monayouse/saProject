
import { useFormik } from 'formik'
import Navbar from '../navbar/Navbar'

// library => Formic =>zakriha ya mona mn el doc

import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
import { authContext } from '../context/AuthenticationContext'
// add ui => think STATE  => rerender



export default function Login() {

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
  const { settoken } = useContext(authContext);
  const [num, setnum] = useState(0)
  //===========

  async function loginTOpage(values) {

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
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      console.log(data.message);
      setmsgSucsses(data.message);
      settoken(data.token);
      console.log(data.token,'gggggg');
      
      localStorage.setItem('tkn', data.token)
      seterrmsg(null);
      setTimeout(() => {
        navigaeUser('/products')

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
    onSubmit: loginTOpage,
    validate: function (values) {  // call befor submite
      //errors => prevent submit
      const errors = {};
      seterrmsg(null);

      // console.log(values);

      // const regexPhone=/^(02)?01[0125][0-9]{8}$/

      if (values.email.includes('@') === false || values.email.includes('.') === false) {
        errors.email = "email invalid"
      }


      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "password invalid"
      }

      return errors;
    }


  })


  return (
    <div>
      
      {/* null =  aflse */}


      <div className="w-75 m-auto pt-5 ">
        {errmsg ? <div className="alert alert-danger">{errmsg}</div> : ''}


        {msgSucsses ? <div className="alert alert-info">{msgSucsses}</div> : ''}



        <form onSubmit={formicObject.handleSubmit}  >

          <label htmlFor="email">email</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} value={formicObject.values.email} id='email' type="text" placeholder='enter email' className='form-control mb-3' />
          {formicObject.errors.email && formicObject.touched.email ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.email}

          </div> : ''}

          <label htmlFor="password">password</label>
          <input onBlur={formicObject.handleBlur} onChange={formicObject.handleChange} value={formicObject.values.password} id='password' type="password" placeholder='enter password' className='form-control mb-3' />

          {formicObject.errors.password && formicObject.touched.password ? <div className="alert alert-primary" role="alert">
            {formicObject.errors.password}

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
            /> : 'Login'}</button>

        </form>
      </div>

    </div>

  )
  //disabled={formicObject.isValid==false || formicObject.dirty==false}
}