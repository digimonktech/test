import React, { Component } from "react";
import { Form, Row, Col, Button  } from "react-bootstrap";

export default class PersonalInfo extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <Form>
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control type="text" placeholder="Jassica"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="age">Age</Form.Label>
              <Form.Control type="text" placeholder="18"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="bodyshape">Body Shape</Form.Label>
              <Form.Control type="text" placeholder="type here"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="bodyshape">Body Shape</Form.Label>
              <Form.Control type="text" placeholder="type here"></Form.Control>
            </Form.Group>
            <Row xs={1} md={2} lg={2}>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" custom>
                    <option>Country 1</option>
                    <option>Country 2</option>
                    <option>Country 3</option>
                    <option>Country 4</option>
                    <option>Country 5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>City</Form.Label>
                  <Form.Control as="select" custom>
                    <option>City 1</option>
                    <option>City 2</option>
                    <option>City 3</option>
                    <option>City 4</option>
                    <option>City 5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label htmlFor="Gender">Gender</Form.Label>
              <div className="form-control">
                <ul className="gender">
                  <li className="malediv">
                    <input
                      type="radio"
                      id="test1"
                      name="radio-group"
                      defaultChecked
                    />
                    <label htmlFor="test1">
                      <i className="flaticon-mars"></i> Male
                    </label>
                  </li>
                  <li className="femalediv">
                    <input type="radio" id="test2" name="radio-group" />

                    <label htmlFor="test2">
                      <i className="flaticon-venus"></i>Female
                    </label>
                  </li>
                  <li className="transgenderdiv">
                    <input type="radio" id="test3" name="radio-group" />
                    <label htmlFor="test3">
                      <i className="flaticon-transgender"></i> Transgender
                    </label>
                  </li>
                </ul>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Measurements</Form.Label>
              <Row xs={1} md={3} lg={3}>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Bust</span>
                      <Form.Control type="text" placeholder="type here" />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Waist</span>
                      <Form.Control type="text" placeholder="type here" />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Hips</span>
                      <Form.Control type="text" placeholder="type here" />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Height</Form.Label>
              <Form.Control type="text" placeholder="type here" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Languages</Form.Label>
              <Form.Control as="select" custom>
                <option>Hindi</option>
                <option>English</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Services</Form.Label>
              <Form.Control as="select" custom>
                <option>Services 1</option>
                <option>Services 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>About us</Form.Label>
              <Form.Control type="text" as="textarea" placeholder="type here" />
            </Form.Group>
            <Form.Group className="text-right">
              <Button type="submit" className="uppercase">
                Update
              </Button>
            </Form.Group>
          </Form>
        </div>
      </>
    );
  }
}
