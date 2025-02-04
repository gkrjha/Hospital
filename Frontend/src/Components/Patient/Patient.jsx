import React from 'react'
import DoctorCard from '../Content/DoctorCard'
import axios from 'axios'

const response = axios.get("")

const Patient = () => {
  return (
    <>
    <DoctorCard button="Create Appointment"/>
    </>
  )
}

export default Patient