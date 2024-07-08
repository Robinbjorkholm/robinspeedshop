import React from 'react'

function VerifyEmailToken({params}) {

  return (
    <div>VerifyEmailToken id: {params.VerifyEmailId} token: {params.VerifyEmailToken}</div>
  )
}

export default VerifyEmailToken