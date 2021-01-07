import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

import {
  getItineraries,
  getProfilesData,
  deleteDestination,
} from '../../../api';

import { List } from '../../common';

import RenderItineraryBuilder from './RenderItineraryBuilder';

const BuildItineraryPage = props => {
  console.log(props);
  const { authState } = useOktaAuth();
  return <RenderItineraryBuilder props={{ ...props, deleteDestination }} />;
};

export default BuildItineraryPage;
