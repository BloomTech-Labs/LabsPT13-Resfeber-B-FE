import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Layout } from 'antd';
import plusImage from '../../../styles/resources/images/+.png';

const RenderItineraryPage = props => {
  console.log(props);
  props.data.push('last');
  return (
    <div style={{ marginLeft: '7vw', marginTop: '2.5vh', paddingLeft: '2%' }}>
      <p>
        <Link to="/">Home</Link>
      </p>
      <div>
        <h1
          style={{
            fontSize: '44px',
            fontWeight: 'bold',
            paddingLeft: '0.35%',
            paddingTop: '0.15%',
            paddingBottom: '1.8%',
          }}
        >
          Itineraries
        </h1>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
          // style={{ paddingRight: '44px' }}

          dataSource={props.data}
          renderItem={(item, i) => (
            <>
              {i !== props.data.length - 1 ? (
                <Link
                  to={{
                    pathname: '/build-itinerary',
                    state: { ...props, clicked: item.id },
                  }}
                >
                  <List.Item
                    className="itineraryThumbnail"
                    style={{
                      border: '4px solid  rgba(0, 0, 0, 0.5)',
                      maxWidth: '69.4%',
                    }}
                  >
                    <figure key={item.id}>
                      <figcaption>
                        <h3>{item.title}</h3>
                      </figcaption>
                      {item.destinations && item.destinations.length > 0
                        ? item.destinations.map(item => {
                            return (
                              <li>
                                <h1 style={{ display: 'inline' }}>-</h1>{' '}
                                {item.destName}
                              </li>
                            );
                          })
                        : 'no destinations added yet'}
                    </figure>
                  </List.Item>
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: '/build-itinerary',
                    state: { ...props, clicked: 'last' },
                  }}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      height: '29.1vh',
                      maxWidth: '69.4%',
                      border: '4px solid black',
                      borderRadius: '1em',
                    }}
                  >
                    <h1 style={{ margin: 'auto', display: 'grid' }}>
                      Add Itinerary
                      <img
                        style={{ margin: 'auto', paddingTop: '5%' }}
                        src={plusImage}
                      />
                    </h1>{' '}
                  </div>
                </Link>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
export default RenderItineraryPage;

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderItineraryPage.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      finished: PropTypes.boolean,
      destinations: PropTypes.array,
    })
  ).isRequired,
};
