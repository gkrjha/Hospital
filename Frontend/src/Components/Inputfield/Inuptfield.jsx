import { Field } from "formik"
import "./Style.css"
import React from 'react'

const Inuptfield = ({type , name, ...props}) => {
    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <Field type={type} name={name} {...props} />
        </div>
    )
}

export default Inuptfield