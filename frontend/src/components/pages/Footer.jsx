import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto" style={{height:"fit-content"}}>
      <div className="container" id='abc'>
        <div className="row">
          <div className="col-md-12">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
          </div>
          <div className="col-md-12 text-md-end">
            <ul className="list-unstyled d-flex mb-0">
              <li className="ms-3"><a className="text-white" href="/about">About Us</a></li>
              <li className="ms-3"><a className="text-white" href="/contact">Contact</a></li>
              <li className="ms-3"><a className="text-white" href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;


// import React from 'react';
// import '../../styles/Footer.css'

// const Footer = () => {

//   return (
//       <footer className="footer">
//         <div className="footer-content">
//         <div>
//              <ul className="list-unstyled d-flex mb-0">
//                <li className="ms-3"><a className="text-white" href="/about">About Us</a></li>
//                <li className="ms-3"><a className="text-white" href="/contact">Contact</a></li>
//                <li className="ms-3"><a className="text-white" href="/privacy">Privacy Policy</a></li>
//              </ul>
//            </div>
//           <div className="footer-section about">
//             <p className='footer-bottom'>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     );
//   };

// export default Footer;