import React, {Component} from 'react';
import {Navbar,NavItem,Row, Icon, Input,Carousel,Button}  from 'react-materialize';
import logo from './logo.svg';
import './App.css';
import image1 from './images/cartagena.jpg';
import image2 from './images/dogwatchinghisownersurf.JPG';
import image3 from './images/olonfromclif.JPG';
import image4 from './images/sunset1.JPG';
import image5 from './images/profphoto.jpg';
import { Document, Page } from 'react-pdf';
import junDev from './Docs/junDev.pdf'
// added to import my resume in PDF format
class App extends Component {
  state = {
  sunrise: null,
  sunset: null,
  numPages: null,
  pageNumber: 1,
}

  onDocumentLoad = ({ numPages }) => {
     this.setState({ numPages });
   }

handleFormSubmit = (e) => {
  e.preventDefault();
  const lat = e.target.children[1].value;
  const lon = e.target.children[3].value;
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`;

  fetch(url)
      .then(res => res.json())
      .then((apiResult) => {
        this.setState({
            sunrise: apiResult.results.sunrise,
            sunset: apiResult.results.sunset
        })
      })

}


  render() {
    const { pageNumber, numPages } = this.state;
//for pdf

  return (
      <div className="App">
        <Navbar className='green darken-4'>
          <NavItem href= {'#resume'}> Resume</NavItem>
          <NavItem href='components.html'>Components</NavItem>
        </Navbar>

        <h1>{'Michael Samara'}</h1>
        <form onSubmit={this.handleFormSubmit}>
        <p>Latitude:</p>
        <input type="text" />
        <p>Longitude:</p>
        <input type="text" />
        <br/>
        <button type="submit">Submit</button>
        </form>

      <h3 className='yellow-text'>Sunrise and Sunset</h3>
        {
          this.state.sunrise ? (
            <div className='Sunrise'>
              <p>{`Sunrise: ${this.state.sunrise}`}</p>
              <p>{`Sunset: ${this.state.sunset}`}</p>
            </div>
          ): null
        }
        <Carousel options={{ fullWidth: true}}
          fixedItem={<h4 className='white-text'>Michael is a creative and dependable Junior Web Developer. Broadly knowledgeable in React, JavaScript, CSS and HTML as well as the principles and techniques of website construction and maintenance.​ ​An ​effective process-driven student and teacher who creates and implements training for businesses and students. Collaborative team player with the ability to effectively communicate at all organizational and education levels. Exceptional problem solving skills, strong business judgement, and demonstrated experience leading cross-functional teams.
            </h4>}
          images={[image1, image2, image3, image4, image5]} >
        </Carousel>
        <div>
          <h3>Request Contact</h3>
          <Row>
            <Input s={6} label="First and Last Name" validate><Icon>account_circle</Icon></Input>
            <Input s={6} label="Email" validate type="Email"><Icon>Email</Icon></Input>
            <button type='submit'>Request Contact</button>
          </Row>
        </div>
        <div id= 'resume'>
         <Document
           file= {junDev}
           onLoadSuccess={this.onDocumentLoad}
            >
           <Page pageNumber={pageNumber} />
         </Document>
         <p>Page {pageNumber} of {numPages}</p>
         <div id='sunrise' className="container"> space for text
         </div>
       </div>
      </div>


    );
  }
}

export default App;
