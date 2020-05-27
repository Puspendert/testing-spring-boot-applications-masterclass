import {Button, Icon, Menu} from "semantic-ui-react";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "./types";
import {keycloakLogin, keycloakLogout} from "./KeycloakService";

const mapState = (state: RootState) => ({
  isAuthenticated: state.authentication.isAuthenticated
});

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const Header: React.FC<Props> = ({isAuthenticated}) => {
  const [activeItem, setActiveItem] = useState<string>();

  return (
    <Menu size='large' stackable>
      <Menu.Item
        as={Link}
        to="/"
        header>Book Reviewr</Menu.Item>

      <Menu.Item
        as={Link}
        name='allBooks'
        active={activeItem === 'allBooks'}
        to="/all-books"
        onClick={() => setActiveItem('allBooks')}>
      </Menu.Item>

      <Menu.Item
        as={Link}
        name='allReviews'
        active={activeItem === 'allReviews'}
        onClick={() => setActiveItem('allReviews')}
        to="/all-reviews"
      />

      <Menu.Menu position='right'>
        <Menu.Item>
          <Button
            as={Link}
            to="/submit-review"
            secondary>
            Submit a new review
          </Button>
        </Menu.Item>

        <Menu.Item>
          {isAuthenticated ?
            <Button
              color='red'
              animated
              onClick={() => keycloakLogout()}>
              <Button.Content visible>Logout</Button.Content>
              <Button.Content hidden>
                <Icon name='sign-out'/>
              </Button.Content>
            </Button> :
            <Button
              primary
              animated
              onClick={() => keycloakLogin()}>
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='sign-in'/>
              </Button.Content>
            </Button>
          }
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default connector(Header);
