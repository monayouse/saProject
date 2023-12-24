import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'


export default class Layout extends Component {
  render() {
    return (
      <div>

        <Navbar />

        <Outlet />


      </div>
    )
  }
}
