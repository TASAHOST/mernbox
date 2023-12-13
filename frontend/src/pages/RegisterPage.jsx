import React from 'react'

const ResgisterPage = () => {
  return (
    <form className='register'>
        <h1>Register</h1>
    <input type="text" name="username" placeholder='username' />
    <input type="password" name='password' placeholder='password' />
    <button>submit</button>
    </form>
  )
}

export default ResgisterPage