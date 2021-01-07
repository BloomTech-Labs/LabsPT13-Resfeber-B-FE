import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URI;
// we will define a bunch of API calls here.
const profile = `/profile`;
const profiles = `/profiles`;
const itineraries = `/itineraries`;
const destinations = `/destinations`;

//CREATE URLS FOR EACH ENDPOINT HERE AND THEN THE DATAGETTER WILL GET THAT THERE DATAS

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios.get(itineraries).then(response => response.data);
};

const getAuthHeader = authState => {
  console.log(authState);
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const profilesGet = async authHeader => {
  console.log('fleep');

  const request = await axios.get(profiles, {
    headers: authHeader,
    baseURL: baseURL,
  });
  console.log(request, 'fleep');
  return request;
};

const getProfilesData = authState => {
  try {
    console.log(authState);
    console.log(profiles);

    return profilesGet(getAuthHeader(authState)).then(response => {
      return response.data;
    });
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const itinerariesGet = authHeader => {
  return axios.get(itineraries, { headers: authHeader, baseURL: baseURL });
};

const deleteDestination = async (authHeader, id) => {
  console.log(authHeader);
  return axios.delete(destinations + id, {
    headers: authHeader,
    baseURL: baseURL,
  });
};

const getItineraries = authState => {
  try {
    console.log(authState);
    console.log(profiles);

    return itinerariesGet(getAuthHeader(authState)).then(response => {
      return response.data;
    });
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

export {
  sleep,
  getExampleData,
  getProfilesData,
  getDSData,
  getItineraries,
  deleteDestination,
};
