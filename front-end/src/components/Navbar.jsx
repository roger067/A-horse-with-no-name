import React from "react";

import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faWallet,
  faCalendar,
  faSignOutAlt,
  faClipboard,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";

import { Typography, Avatar, Flex } from "./";
import { ROLES } from "../constants";

const Navbar = () => {
  const history = useHistory();
  const path = history.location.pathname;

  const name = localStorage.getItem("user:name");
  const role = localStorage.getItem("user:role");

  const isAdmin = role === "0";

  const logout = () => {
    const keysToRemove = [
      "token",
      "user:email",
      "user:name",
      "user:id",
      "user:role",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  return (
    <NavbarTag>
      <Avatar name={name} role={ROLES[role]} />
      <Flex flexDirection="column" mt="32px" height="100%">
        {isAdmin && (
          <>
            <LinkList to="/" className={path === "/" ? "active" : ""}>
              <span className="icon">
                <FontAwesomeIcon icon={faChartPie} />
              </span>
              <Typography ml="16px" size="16px" weight="600">
                Dashboard
              </Typography>
            </LinkList>
            <LinkList
              to="/profit"
              className={path.includes("/profit") ? "active" : ""}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faWallet} />
              </span>
              <Typography ml="16px" size="16px" weight="600">
                Receitas
              </Typography>
            </LinkList>
          </>
        )}
        <LinkList
          to="/freela"
          className={
            path.includes("/freela") || path.includes("/summary")
              ? "active"
              : ""
          }
        >
          <span className="icon">
            <FontAwesomeIcon icon={faCalendar} />
          </span>
          <Typography ml="16px" size="16px" weight="600">
            Meus Freelances
          </Typography>
        </LinkList>
        <LinkList
          to="/sprint"
          className={path.includes("/sprint") ? "active" : ""}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faClipboard} />
          </span>
          <Typography ml="16px" size="16px" weight="600">
            Sprints
          </Typography>
        </LinkList>
        {isAdmin && (
          <LinkList
            to="/config"
            className={path.includes("/config") ? "active" : ""}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faUserCog} />
            </span>
            <Typography ml="16px" size="16px" weight="600">
              Configurações
            </Typography>
          </LinkList>
        )}
        <Flex alignItems="flex-end" height="100%" width="100%">
          <LinkList to="/login" onClick={logout}>
            <span className="icon">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            <Typography ml="16px" size="16px" weight="600">
              Sair
            </Typography>
          </LinkList>
        </Flex>
      </Flex>
    </NavbarTag>
  );
};

const NavbarTag = styled.nav`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 32px 32px 32px 0;
  min-height: 100vh;
  width: 360px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const LinkList = styled(Link)`
  width: 100%;
  background: ${(props) => (props.active ? "f5f5f5" : "#fff")};
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 8px;
  padding: 16px 28px;
  border-radius: 0 12px 12px 0;
  border-left: 4px solid #fff;
  transition: all 0.3s;

  .icon {
    color: #3f3f3f;
    transition: color 0.3s;
    font-size: 24px;
  }

  &:hover,
  &.active {
    background: #f5f5f5;
    border-left: 4px solid #ffc04a;

    > span {
      font-weight: 700;
    }

    .icon {
      color: #ffc04a;
    }
  }
`;

export default Navbar;
