import React from 'react'
import { Container,Col, Row } from 'react-bootstrap';
import "./styles.constant.scss"
const FormContainer = ({children}) => {
    return (
        <Container className='form-container'>
            <Row className='justify-content-md-center '>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
