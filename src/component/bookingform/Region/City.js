import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
export default class City extends Component {
    render() {
        return (
          <>
            <ul className="region">
              <li>
                <NavLink to="#">
                  ss
                </NavLink>
              </li>
              <li>
                <NavLink to="#" >
                  Australia (Coming soon)
                </NavLink>
              </li>
              <li>
                <NavLink to="#" >
                  Germany
                </NavLink>
              </li>
              <li>
                <NavLink to="#" >
                  Switzerland
                </NavLink>
              </li>
              <li>
                <NavLink to="#" >
                  Poland (Coming soon)
                </NavLink>
              </li>
              <li>
                <NavLink to="#" >
                  Spain (Coming soon)
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  United Kingdom (Coming soon)
                </NavLink>
              </li>
            </ul>
          </>
        );
    }
}
