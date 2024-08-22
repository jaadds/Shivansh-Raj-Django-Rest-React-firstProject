import React from 'react'
import Form from '../components/form'

function register() {
  return (
    <Form route="api/user/register/" method="register" />
  )
}

export default register