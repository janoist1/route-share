import React from 'react'
import { IndexLink, Link } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

class NavBar extends React.Component {
  state = {
    open: false,
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  render () {
    return (
      <Navbar color='faded' className='navbar-expand-sm' light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand href='/'>Route + Share</NavbarBrand>

        <Collapse isOpen={this.state.open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={IndexLink} to='/'>home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/routes'>routes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/counter'>counter</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default NavBar
