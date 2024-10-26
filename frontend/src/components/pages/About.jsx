import React from 'react'
import {Container, Row} from 'react-bootstrap';
import Building from '../../images/AboutUsImg.jpg';


export default function About() {
  return (
    <>
    <div>
    <img
            src={Building}
            alt='Doctor'
            className='d-block w-100'
            style={{ height: '500px', maxWidth: '50%', marginLeft: '400px', marginTop: '20px' }}
          />
    </div>
    <Container style={{marginTop: "30px"}}>
      <Row>
     <h4> 

     <p>

Welcome to HealthSphere, a pioneering health management system committed to revolutionizing the way individuals and healthcare providers manage health and wellness.
At HealthSphere, our mission is to deliver an innovative platform that simplifies and enhances the process of health monitoring, 
enabling better outcomes and a healthier future for everyone.

Our system is designed with the user in mind, offering intuitive features that cater to both patients and healthcare professionals.
We leverage advanced technology to provide accurate, real-time health data, ensuring you stay on top of your health journey.
</p>

  <p>
  At HealthSphere, we blend cutting-edge technology with a user-centric approach,
  providing a wide array of features that cater to both patients and healthcare professionals.

Key Features of HealthSphere
Personal Health Dashboard: Get a complete overview of your health with real-time data on vital signs, 
activity levels, and more, all in one easy-to-use dashboard.

Appointment Scheduling: Seamlessly book and manage appointments with healthcare providers, 
with reminders and follow-up notifications.

Medication Management: Keep track of prescriptions, 
set reminders for medication, and receive alerts for refills.

Health Records Storage: Securely store and access your medical history, 
lab results, and other important health documents.

Telemedicine Integration: Connect with healthcare providers for virtual consultations,
 ensuring you get the care you need from the comfort of your home.

Data Analytics & Insights: Gain insights into your health trends and progress with advanced data analytics,
 helping you make informed decisions.

Customizable Alerts: Set personalized alerts for various health metrics,
 such as heart rate, blood pressure, and glucose levels, to stay proactive about your health.

Multi-Device Access: Access your health data anytime, anywhere, from any device,
 ensuring continuity of care no matter where you are.


  </p>
  
<p>
Meet Our Team
HealthSphere is brought to life by a dedicated team of professionals, each bringing unique expertise to the table:

  <hr/>
<strong>Mr. Nilesh Shirke (Guide) </strong>– Nilesh serves as our guide and mentor,
leading the team with his extensive experience in healthcare technology and strategic vision. 
His leadership ensures that HealthSphere remains at the forefront of innovation.
</p>
<hr/>
<strong>Mr. Abhishek Desai</strong> – Abhishek is the technical backbone of HealthSphere, specializing in software development and system architecture.
His focus on building a secure, scalable, and user-friendly platform is key to our system’s success.
<p>
<hr/>
<strong>Mr. Benson Sabu </strong> – Benson brings deep insights into healthcare operations and patient management.
His role is crucial in ensuring that HealthSphere meets the practical needs of users and healthcare providers alike.
</p>
<hr/>
<strong>Mr. Dinesh Pukale</strong> – Dinesh is our project management expert, coordinating efforts across the team to ensure that our projects are delivered on time and with the highest quality.
His organizational skills keep everything running smoothly.
<hr/>
<p>
<strong>Mr. Nishant Deore </strong> – Nishant specializes in user experience and interface design.
His commitment to creating an intuitive and engaging user interface ensures that HealthSphere is easy to navigate and use.
</p>
<hr/>
<strong>Mr. Rajul Dubey </strong> – Rajul is responsible for quality assurance, ensuring that HealthSphere meets the highest standards of reliability and performance. 
His attention to detail guarantees a seamless user experience.
<hr/>
<p>
<strong>Mr. Shisheer Ghutugade </strong>– Shisheer is our data analytics expert, focusing on making sense of complex health data.
His work helps transform raw data into actionable insights that users can rely on.
</p>
<hr/>
<strong>Mr. Hrishikesh Shedge</strong> – Hrishikesh handles our customer support and outreach, ensuring that our users have the assistance they need.
His dedication to user satisfaction is key to maintaining HealthSphere’s positive reputation.
<br/>
<br/>
<p>
Together, we are HealthSphere—a team united by our passion for improving health outcomes through technology.
We are dedicated to providing you with the tools and support you need to manage your health with confidence.

 </p> 
 
 </h4>
      </Row>
    </Container>
    </>
  )
}

