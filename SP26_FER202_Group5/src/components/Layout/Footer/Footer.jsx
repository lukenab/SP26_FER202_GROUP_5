import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import './Footer.css'
import {IoIosArrowForward} from 'react-icons/io'
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-sec">
      <Container>
        <Row className="footer-content">
          <Col md={4} className="footer-1">
            <ul>
              <li className="footer-header"><strong>Discover</strong></li>
              <li>
                <a href="/" className="footer-icon">
                  <IoIosArrowForward /> Home
                </a>
              </li>
              <li>
                <a href="/books" className="footer-icon">
                   <IoIosArrowForward />  All Books
                </a>
              </li>
              <li>
                <a href="/admin/categories" className="footer-icon">
                   <IoIosArrowForward />  Categories
                </a>
              </li>
              <li>
                <a href="/cart" className="footer-icon">
                   <IoIosArrowForward /> Cart
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="footer-2">
            <ul>
              <li className="footer-header"><strong>Contact</strong></li>
              <li>
               <MdOutlineMailOutline /> support@bookstore.com
              </li>
              <li>
              <HiOutlinePhone /> 0812 154 005
              </li>
              <li>
              <IoLocationOutline /> Can Tho, Viet Nam 
              </li>
            </ul>
          </Col>

          <Col md={4} className="footer-3">
            <ul>
              <li className="footer-header"><strong>Connect with Us</strong></li>
              <li style={{marginLeft: "40px"}}>
                <a className="footer-media" href="#" target="_blank" rel="noreferrer">
               <FaFacebook className='me-2' />
                </a>
                <a className="footer-media" href="#" target="_blank" rel="noreferrer">
                  <FaInstagram className='me-2' />
                </a>
                <a className="footer-media" href="#" target="_blank" rel="noreferrer">
                <FaThreads />
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="copyright text-center">
          <p>
            Copyright &copy; {new Date().getFullYear()} Online Book Store. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;