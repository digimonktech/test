import React, { Component } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import InnerBanner from "./InnerBanner";
import { Container } from 'react-bootstrap';
export default class TermUse extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Header />
        <InnerBanner Title="Terms of Use" item="Term of Use" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <div className="abouttext">
              <h2>Lorem Ipsum</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras
                sed felis eget velit aliquet sagittis. Vitae purus faucibus
                ornare suspendisse sed nisi lacus sed viverra. Dolor sit amet
                consectetur adipiscing elit ut aliquam purus. Vivamus arcu felis
                bibendum ut. Curabitur gravida arcu ac tortor dignissim
                convallis aenean et. Maecenas sed enim ut sem viverra aliquet
                eget sit. Non diam phasellus vestibulum lorem sed risus. Mauris
                rhoncus aenean vel elit scelerisque. Tincidunt nunc pulvinar
                sapien et ligula. Purus non enim praesent elementum facilisis.
                Elit ut aliquam purus sit amet luctus. Sed egestas egestas
                fringilla phasellus faucibus scelerisque eleifend. Ipsum dolor
                sit amet consectetur. Sed euismod nisi porta lorem mollis
                aliquam ut porttitor. Ultricies mi eget mauris pharetra et
                ultrices neque ornare. Elementum eu facilisis sed odio morbi
                quis commodo odio aenean. Neque laoreet suspendisse interdum
                consectetur libero id faucibus nisl tincidunt.
              </p>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
