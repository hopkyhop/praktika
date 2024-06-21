import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateCourse from '../components/CreateCourse'

const Admin = () => {
  const [isModalShow, setIsModalShow] = useState(false)
  return (
    <Container className='py-5 d-flex justify-content-between'>
      <Button variant='light' style={{border: '1px solid blue'}} onClick={() => setIsModalShow(true)}>Добавить новый курс</Button>
      <CreateCourse show={isModalShow} onHide={() => setIsModalShow(false)}/>
    </Container>
  )
}

export default Admin
