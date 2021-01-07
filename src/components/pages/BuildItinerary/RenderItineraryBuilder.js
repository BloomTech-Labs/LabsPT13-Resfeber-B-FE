import React, { useEffect, useState, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import { deleteDestination } from '../../../api';

import PropTypes from 'prop-types';
import { Row, Col, Divider, Button } from 'antd';
import ReactMapboxGl, {
  Layer,
  Feature,
  Marker,
  Popup,
  Geocoder,
  MapContext,
} from 'react-mapbox-gl';
import mapboxgl, { Marker as morker } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import markerImg from '../../../styles/marker.png';
import bedImg from '../../../styles/bed.png';
import gasImg from '../../../styles/gas.png';

import {
  CloseOutlined,
  PushpinOutlined,
  MenuOutlined,
  LeftCircleOutlined,
} from '@ant-design/icons';
let lon = 33;
let lat = 33;
const style = { background: '#0092ff', padding: '8px 0' };

const RenderItineraryBuilder = props => {
  const { authState } = useOktaAuth();

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

  const addPopup = (el, lat, lng, map) => {
    const placeholder = document.createElement('div');
    console.log(el);
    // ReactDOM.render(el(), placeholder);

    const marker = new mapboxgl.Popup()
      .setHTML('<h3>Destination Data Here</h3>')
      .setLngLat({ lng: lng, lat: lat })
      .addTo(map);

    return marker;
  };

  console.log(props);

  const [itinerary, setItinerary] = useState({ title: '{Itinerary Name}' });
  // const [markers, setMarkers] = useState([])
  const [CurrDest, setCurrDest] = useState({ destName: 'DEST NAME HERE' });

  useEffect(() => {
    console.log(props.location.state);
    const itins = props.location.state ? props.location.state.data : [];
    itins.map(elem => {
      console.log(elem.id, props.location.state.clicked);
      if (elem.id === props.location.state.clicked) {
        setItinerary(elem);
        setCurrDest(elem.destinations[0]);
      }
    });
  }, [itinerary]);

  const popupz = () => (
    <Popup
      className="tooltip"
      coordinates={[-122.4194, 37.7749]}
      offset={{
        'bottom-left': [0, -28],
        bottom: [0, -38],
        'bottom-right': [-12, -38],
      }}
      anchor="bottom-left"
    >
      destination name
      <div className="pricesContainer">
        <>
          <img src={gasImg} /> $0.00
        </>{' '}
        <>
          <img src={bedImg} /> $0.00
        </>
      </div>
    </Popup>
  );

  // props.data.push('last')
  return (
    <div style={{ marginLeft: '7vw', marginTop: '2.5vh', paddingLeft: '2%' }}>
      <Link className="backButton" to="/itineraries">
        <LeftCircleOutlined />
      </Link>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={9}>
            <h1
              style={{
                fontSize: '44px',
                fontWeight: 'bold',
                paddingLeft: '0.35%',
                paddingTop: '0.15%',
                paddingBottom: '1.8%',
              }}
            >
              {itinerary.title}
            </h1>

            <h2 style={{ fontWeight: 'bold', width: 'auto', margin: 'auto' }}>
              Current Selection
            </h2>
            <h4 className="selectedDest">
              {CurrDest.destName ? CurrDest.destName : 'None'}
            </h4>
            <Button className="addDest" block>
              Add Destination (+)
            </Button>

            <div className="divider" />
            <h1>Destinations</h1>
            {itinerary.destinations && itinerary.destinations.length > 0
              ? itinerary.destinations.map(elem => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '2vh',
                      }}
                    >
                      <div>
                        <MenuOutlined />
                        {elem.destName}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '10%',
                        }}
                      >
                        <PushpinOutlined />{' '}
                        <CloseOutlined
                          onClick={e => {
                            //call server and delete it
                            console.log(e.target);
                            deleteDestination(authState, '/' + elem.id);
                            //set local itin state to remove it

                            for (let i in itinerary.destinations) {
                              console.log(itinerary.destinations[i]);
                              if (itinerary.destinations[i].id === elem.id) {
                                let itinObj = itinerary;
                                itinObj.destinations.splice(i, 1);
                                setItinerary(itinObj);
                              }
                              console.log(i);
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              : 'Use the search bar in the map tool to find and add new destinations'}
          </Col>
          <Col className="gutter-row" span={14}>
            <div style={{ height: '75vh', width: '50vw' }}>
              <Map
                style="mapbox://styles/mapbox/streets-v8"
                containerStyle={{ height: `100%`, width: `100%` }}
                zoom={[3]}
                center={[-98.5795, 39.8283]}
              >
                <Popup
                  className="tooltip"
                  coordinates={[-122.4194, 37.7749]}
                  offset={{
                    'bottom-left': [0, -28],
                    bottom: [0, -38],
                    'bottom-right': [-12, -38],
                  }}
                  anchor="bottom-left"
                >
                  destination name
                  <div className="pricesContainer">
                    <>
                      <img src={gasImg} /> $0.00
                    </>{' '}
                    <>
                      <img src={bedImg} /> $0.00
                    </>
                  </div>
                </Popup>

                <Marker coordinates={[-122.4194, 37.7749]} anchor="bottom-left">
                  <img src={markerImg} />
                </Marker>
                <MapContext.Consumer>
                  {map => {
                    const geocoder = new MapboxGeocoder({
                      accessToken: process.env.REACT_APP_MAPBOX_KEY,
                      mapboxgl: mapboxgl,
                      position: 'bottom-left',
                      zoom: 1,
                    });
                    // options.proximity.latitude
                    const text = document.createTextNode('Search');
                    map.addControl(geocoder);
                    console.log(geocoder.options.proximity);
                    const parent = geocoder.container.parentNode;
                    const searchButton = document.createElement('div');
                    parent.parentNode.style = {};
                    parent.className = 'mapboxgl-ctrl-bottom-center';
                    searchButton.className = 'searchButton';
                    geocoder.on('result', e => {
                      console.log('wow');
                      console.log(e);

                      const popup = new mapboxgl.Popup({
                        offset: {
                          'bottom-left': [0, -28],
                          bottom: [0, -38],
                          'bottom-right': [-12, -38],
                        },
                        anchor: 'bottom-left',
                      })
                        .setLngLat(e.result.center)
                        .setHTML()
                        .addTo(map);
                      console.log(popupz);
                      addPopup(
                        popupz,
                        e.result.center[1],
                        e.result.center[0],
                        map
                      );
                    });
                    searchButton.appendChild(text);
                    parent.appendChild(searchButton);
                  }}
                </MapContext.Consumer>
              </Map>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default RenderItineraryBuilder;

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderItineraryBuilder.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      //   id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      //   title: PropTypes.string,
      //   description: PropTypes.string,
      //   finished: PropTypes.boolean,
      //   destinations: PropTypes.array,
    })
  ).isRequired,
};
