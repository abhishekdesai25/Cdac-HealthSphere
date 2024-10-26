import React from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Home.css';
import Building from '../../images/Building.jpg';
import Beds from '../../images/Beds.jpg';
import Surgery from '../../images/Surgery.jpg';
import hospital1 from '../../images/Hospital1.jpg';
import Neurology from '../../images/Neurology.jpg';
import Heart from '../../images/Heart.jpg';
import Nephrology from '../../images/Nephrologist.jpg';
import Ophthamologist from '../../images/Opthamologist.jpg';

export default function Home(){
  return (
    <div>
      <Carousel className='imgs' slide={false}>
        <Carousel.Item interval={2000}>
          <img
            src={Building}
            alt='Doctor'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
          <div className='custom-text-overlay'>
            <h1>Welcome To HealthSphere</h1>
            <p>We provide our patients the Best Care</p>
           </div>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={Beds}
            alt='Cardiology'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            src={Surgery}
            alt='Cardiology'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>
      </Carousel>
      <hr />

      <div className='container' id='abc'>
        <Row>
          <Col>
            <div className='test-dark'>
              <h1>Welcome to HealthSphere</h1>
              <br />
              <p>
                <h3>
                  We have ten years of experience in the healthcare sector and
                  is known for providing quality healthcare and valuable
                  experience to all domestic and international patients. Our
                  healthcare offerings are supported by a team of compassionate
                  and dedicated medical professionals who have rich knowledge
                  and experience in their respective domains to evolve as a
                  benchmark in quality healthcare available to one and all.
                </h3>
              </p>
            </div>
          </Col>
          <Col>
            <Card className='testCard square bg-primary rounded'>
              <Card.Img src={hospital1} />
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <hr />
      <div className='cardcontainer' id="cardcontainer">
        <h2 className='Jumbotron'style={{textAlign:'center'}}>Center of Excellence</h2>
        <br />
        <Row>
          <Col md={3}>
            <Card className='card1'>
              <Card.Img src={Neurology} />
              <Card.Body>
                <Card.Title style={{textAlign:'center'}}>Neurologist</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='card2'>
              <Card.Img src={Heart} />
              <Card.Body>
                <Card.Title style={{textAlign:'center'}}>Cardiologist</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='card3'>
              <Card.Img src={Nephrology} />
              <Card.Body>
                <Card.Title style={{textAlign:'center'}}>Nephrologist</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='card4'>
              <Card.Img src={Ophthamologist} />
              <Card.Body>
                <Card.Title style={{textAlign:'center'}}>Ophthalmologist</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
