import React, { Component } from "react";
import {
  Navbar,
  NavItem,
  Row,
  Icon,
  Input,
  Carousel,
  Button,
  Slider,
  Slide
} from "react-materialize";
import "./App.css";
import image1 from "./images/cartagena.jpg";
import image2 from "./images/dogwatchinghisownersurf.JPG";
import image3 from "./images/olonfromclif.JPG";
import image4 from "./images/sunset1.JPG";
import image5 from "./images/profphoto.jpg";
import { Document, Page } from "react-pdf";
import MichaelSamaraDevResNow from "./Docs/MichaelSamaraDevResNow.pdf";
// added to import my resume in PDF format
class App extends Component {
  state = {
    AQI: null,
    city: "",
    country: "",
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const city = this.state.city;
    const country = this.state.country;
    const AQI = this.state.value;

    const url = `https://api.openaq.org/v1/measurements?country=${country}&limit=10000`;
    //const url = `https://api.openaq.org/v1/measurements`;

    fetch(url)
      .then(respond => respond.json())
      .then(apiResult => {
        debugger;
        const results = apiResult.results;
        const cityAQI = results.find(result => {
          console.log("CITY: ", result.city);
          return result.city.toLowerCase().trim() === city.toLowerCase().trim();
        });

        this.setState({
          AQI: cityAQI && cityAQI.value,
          city: "",
          country: ""
        });
      });
  };

  onChange(e, type) {
    e.preventDefault();
    const stateObj = {};
    stateObj[type] = e.target.value;
    this.setState(stateObj);
  }

  render() {
    const { pageNumber, numPages } = this.state;
    //for pdf

    return (
      <div className="App">
        <Navbar className="green darken-4">
          <NavItem href={"#resume"}> Resume</NavItem>
          <NavItem href="https://github.com/michaelsam08?tab=repositories">
            GitHub
          </NavItem>
        </Navbar>

        <h1>{"Fetch...the Air Quality"}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <p>City:</p>
          <input
            value={this.state.city}
            onChange={e => this.onChange(e, "city")}
            type="text"
          />
          <p>Country (ISO code):</p>
          <input
            value={this.state.country}
            onChange={e => this.onChange(e, "country")}
            type="text"
          />
          <br />
          <button type="submit">Submit</button>
        </form>

        <h3 className="orange-text">AQI Score</h3>
        {this.state.AQI ? (
          <div className="Sunrise">
            <p>{`AQI: ${this.state.AQI}`}</p>
          </div>
        ) : null}
        <Slider>
          <Slide src={image1} color="blue" title="Cartagena Colombia.">
            Between 2016 and 2017 I lived in Bogota and Barranquilla Colombia.
          </Slide>
          <Slide src={image3} title="Ecuadorian Coast" placement="left">
            I was able to spend 3 months working remotely here last year.
          </Slide>
          <Slide src={image5} title="Michael Samara" placement="right">
            Enjoys working with Austin Coding Academy.
          </Slide>
        </Slider>
        {/* <Carousel
          options={{ fullWidth: true }}
          fixedItem={
            <h4 className="white-text">
              Michael is a versatile and quick learning Web Developer. Broadly
              knowledgeable in React, JavaScript, Express, MongoDB, Node.js, CSS
              and HTML. An effective process-driven developer who creates and
              implements applications for businesses and individuals.
              Collaborative team player with the ability to effectively
              communicate at all organizational and education levels.
              Exceptional problem solving skills, strong business judgement, and
              demonstrated experience contributing to and leading
              cross-functional teams.
            </h4>
          }
          images={[image1, image2, image3, image4, image5]}
        /> */}
        <div>
          <h3>Request Contact</h3>
          <form
            action="https://formspree.io/michaelsam08@gmail.com"
            method="POST"
          >
            <Input
              type="text"
              name="name"
              s={6}
              label="First and Last Name"
              validate
            >
              <Icon>account_circle</Icon>
            </Input>
            <Input type="email" s={6} label="Email" validate name="_replyto">
              <Icon>Email</Icon>
            </Input>
            <Button name="name" type="submit" value="send">
              Request Contact
            </Button>
          </form>
        </div>
        <div id="resume">
          <Document
            file={MichaelSamaraDevResNow}
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <div id="sunrise" className="container">
            {" "}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
