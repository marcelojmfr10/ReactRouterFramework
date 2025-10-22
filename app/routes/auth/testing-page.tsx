
import React from 'react'
import { Link } from 'react-router';

const TestingPage = () => {
  return (
    <>
    <div>testing page</div>
    <Link className='text-blue-500 underline' to="/auth/login">go back</Link>
    </>
  )
}

export default TestingPage;
