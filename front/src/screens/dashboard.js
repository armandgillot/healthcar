import "../App";
import React, { useState } from "react";

import Nav from '../component/Nav'
import Header from "../component/Header";
import FooterDash from '../component/Footer';
import Profil from '../component/ScreenProfil'
import Booking from '../component/Booking'


import {
  Card,
  Layout,
  Menu,
  Affix,
} from "antd";

const { Meta } = Card;
const { SubMenu } = Menu;
const { Content } = Layout;

function Dashboard(props) {

  return (
    <Layout>
      <Affix>
        <Nav />
      </Affix>

      <Layout>
 

      <Content>
        <Booking/>
      </Content>

      </Layout>

    </Layout>
  );
}

export default Dashboard;
