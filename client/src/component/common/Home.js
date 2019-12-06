import React from 'react'
import {Carousel} from 'react-bootstrap'
import image from '../images/ss1.jpg'
import image1 from '../images/ss3.jpg'
import image2 from '../images/sss.jpg'

export default function Home(props){
    return (
        <Carousel >
            
        <Carousel.Item style={{position:'relative',top:'20px',height:'550px'}}>
            <img
            className="d-block w-100"
            src={image}
            alt="First slide"
            />
        </Carousel.Item>
        <Carousel.Item style={{position:'relative',top:'20px',height:'550px'}}>
            <img
            className="d-block w-100"
            
            src={image1}
            alt="Third slide"
            />
        </Carousel.Item>
        <Carousel.Item style={{position:'relative',top:'20px',height:'550px'}}>
            <img
            className="d-block w-100"
            
            src={image2}
            alt="Third slide"
            />
        </Carousel.Item>
        </Carousel>
    )

}