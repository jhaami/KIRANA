import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const ServiceData = [
  {
    imgUrl: weatherImg,
    title: "Shavvy News Updates",
    desc: 'Stay up-to-date with the latest in shopping through "Kirana News Updates," featuring breakthroughs in Kirana technology, market trends, and policy changes.',
  },
  {
    imgUrl: guideImg,
    title: "Shavvy Articles",
    desc: 'Stay up-to-date with the latest in shopping through "Kirana News Updates," featuring breakthroughs in Kirana technology, market trends, and policy changes.',
  },
  {
    imgUrl: customizationImg,
    title: "Fast and Easy Payment",
    desc: 'Stay up-to-date with the latest in shopping through "Kirana News Updates," featuring breakthroughs in Kirana technology, market trends, and policy changes.',
  },
];

const ServiceList = () => {
  return (
    <>
      {ServiceData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
