import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading,displayAlertPassword } =
    useAppContext()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  //const [location, setLocation] = useState(user?.location)
  const [password,setPassword] = useState()
  const [confirmpassword,setConfirmPassword] = useState(user?.confirmpassword)


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName  || !password) {
      // test and remove temporary
      displayAlert()
      return
    }
    if (password !== confirmpassword){

      displayAlertPassword()
       return
    }

    updateUser({ name, email, lastName , password })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type='text'
            name='password'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormRow
            type='text'
            name='confirmpassword'
            value={confirmpassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile