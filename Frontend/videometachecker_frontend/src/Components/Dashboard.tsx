import React from 'react'
import Upload from '../features/Upload'
import Results from '../features/Results'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState, AppDispatch } from '../App/store'


const Dashboard: React.FC =()=>{
   const {first_name} = useSelector((state:RootState)=>
  state.login
 )
  return (
    <>
    <div><h1>
      Hi {first_name}! Welcome to the Dashboard!
      </h1>
      <Upload/>
      <br />
      <Results/>
      </div>
    </>
  )
}
export default Dashboard