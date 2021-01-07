import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../common';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div>
      <Redirect to="/itineraries" />

      <h1>Hi {userInfo.name} welcome to Labs Basic SPA/</h1>
      <div>
        <p>This is a fairly typical example of nothing. uwu</p>
        <p>
          <Link to="/itineraries">Your Itineraries</Link>
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
