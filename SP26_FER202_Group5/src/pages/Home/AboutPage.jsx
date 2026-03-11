import React from "react";
import { Container, Row, Col, Card, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      {/* breadcrumb */}
      <Breadcrumb className="pt-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", style: { textDecoration: "none" } }} > Home </Breadcrumb.Item>
        <Breadcrumb.Item active>About</Breadcrumb.Item>
      </Breadcrumb>

      {/* about section */}
      <Container className="shadow-lg border-0 rounded-3 mb-4 p-4">

        <Row className="align-items-center">

          {/* logo */}
          <Col md={4} className="text-center">
            <img
              src="/images/logo.png"
              alt="Explore Books"
              style={{
                width: "220px",
                objectFit: "contain"
              }}
            />
            <h4 className="mt-3 fw-bold" style={{ color: "#1e3d52" }}>
              Explore Books
            </h4>
          </Col>

          {/* description */}
          <Col md={8}>
            <Card className="border-0 shadow-sm p-3">
              <h5 className="fw-bold" style={{ color: "#1e3d52" }}>
                About Our Website
              </h5>
              <hr />

              <p className="text-secondary lh-lg" style={{ textAlign: "justify" }}>
                Explore Books is a modern web application designed to help
                readers discover books across multiple categories such as
                Fantasy, Programming, Mystery, Manga, and Self-Help.
              </p>

              <p className="text-secondary lh-lg" style={{ textAlign: "justify" }}>
                Our platform allows users to easily browse books, search for
                titles, explore categories, and view detailed information about
                each book including author, country, publication year, and
                description.
              </p>

              <p className="text-secondary lh-lg" style={{ textAlign: "justify" }}>
                This project was developed as a learning project focusing on
                modern web development using React, React Router, Bootstrap,
                and JSON Server.
              </p>

              <div className="mt-3">
                <Button
                  as={Link}
                  to="/books"
                  style={{ background: "#1e3d52" }}
                >
                  Explore Books
                </Button>
              </div>

            </Card>
          </Col>

        </Row>
      </Container>

      {/* features */}
      <Container className="shadow-lg border-0 rounded-3 mb-4 p-4">

        <h4 style={{ color: "#1e3d52" }}>Platform Features</h4>
        <hr />

        <Row className="g-4">

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <h5 style={{ color: "#1e3d52" }}>📚 Browse Books</h5>
              <p className="text-secondary">
                Explore a wide collection of books from different genres
                including Fantasy, Programming, Horror, and more.
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <h5 style={{ color: "#1e3d52" }}>🔎 Search System</h5>
              <p className="text-secondary">
                Easily search books by title and quickly find the information
                you need.
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 p-3">
              <h5 style={{ color: "#1e3d52" }}>🛒 Book Details</h5>
              <p className="text-secondary">
                View detailed book information including author, price,
                description, and stock availability.
              </p>
            </Card>
          </Col>

        </Row>

      </Container>
    </>
  );
};

export default AboutPage;