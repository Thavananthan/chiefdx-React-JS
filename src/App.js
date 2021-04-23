import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
import Card from '../src/core/Card';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const App = () => {

  const [loading, setLoading] = useState(false); // loading function state
  const [userData, setUserData] = useState(null); // user  data state
  const [isQuickView, setQuickView] = useState(false); //edit view state
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    website: ''
  })

  useEffect(() => {
    setLoading(true);
    fetchDate(); // api call methods
  }, []);




  const fetchDate = async () => {
    await axios.get('/user')
      .then((res) => {
        setUserData(res.data);
        setLoading(false)
      }).catch(err => console.log(err))
  }

  // delete user from array state
  const onDelete = (id) => {
    let items = userData.filter(item => item.id !== id);
    setUserData(items);
  }

  // edit model view  
  const handleShowQuickView = (id) => {
    setQuickView(true);
    let index = userData.find(
      (item) => item.id === id
    );
    setEditUser({
      ...editUser,
      id: index?.id,
      name: index?.name,
      phone: index?.phone,
      email: index?.email,
      website: index?.website
    })
  };

  // close the model
  const handleHideQuickView = () => {
    setQuickView(false);
  };

  // update user 
  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData(userData.map(x => {
      if (x.id !== editUser.id) return x
      return { ...x, name: editUser.name, email: editUser.email, phone: editUser.phone, website: editUser.website }
    }))
    setQuickView(false);
  }

  return (
    <React.Fragment>
      <div className="App">
        {loading ?
          <div className="spinner">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
          :
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {userData?.map((data, index) => {
              return (
                <Card data={data} key={index} onDelete={onDelete} handleShowQuickView={handleShowQuickView} />
              )
            })}
          </div>
        }
      </div>

      <Modal
        size="lg"
        show={isQuickView}
        onHide={handleHideQuickView}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ModalHeader closeButton>
          <ModalTitle id="example-modal-sizes-title-lg">
            Modal
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile number"
                required
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Web</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Website"
                required
                value={editUser.website}
                onChange={(e) => setEditUser({ ...editUser, website: e.target.value })}
              />
            </Form.Group>


            <Button variant="primary" type="submit" style={{ marginTop: '1rem' }}>
              Submit
  </Button>
          </Form>
        </ModalBody>
      </Modal>


    </React.Fragment>
  );
}

export default App;
