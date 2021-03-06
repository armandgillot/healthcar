import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import "../App.less";
import {
  Affix,
  Form,
  Input,
  Button,
  Layout,
  Typography,
  Row,
  Col,
  message,
} from 'antd';

import Nav from '../component/Nav'
import Header from "../component/Header";
import FooterDash from '../component/Footer';

const { Content } = Layout;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};


export default function Profil(props) {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const { handleSubmit, pristine, submitting } = props;


  const [value, setValue] = useState([]);
  // UpdateProfil 

  const [nomEntreprise, setEntreprise] = useState(userData.nomEntreprise);
  const [siret, setSiret] = useState(userData.siret);
  const [occupation, setOccupation] = useState(userData.occupation);
  const [lastname, setLastname] = useState(userData.lastname);
  const [firstname, setFirstname] = useState(userData.firstname);
  const [password, setPassword] = useState(userData.password);
  const [role, setRole] = useState(userData.role);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [adresse, setAdresse] = useState(userData.role == "ambulance" ? userData.adresse[0].address : null );
  const [postalCode, setCodePostal] = useState(userData.role == "ambulance" ? userData.adresse[0].postalCode : null );
  const [city, setCity] = useState(userData.role == "ambulance" ? userData.adresse[0].city : null );
  ///}
  


  async function UpdateProfil() {
    var request = await fetch("/users/update-profil", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${userData.token}&lastname=${lastname}&firstname=${firstname}&email=${email}&phone=${phone}&password=${password}&adresse=${adresse}&postalCode=${postalCode}&city=${city}&nomEntreprise=${nomEntreprise}&siret=${siret}&occupation=${occupation}`,
    });
    let response = await request.json();

    if (response) {
      successUpdate();
    } else {
      errorUpdate();
    }

  };

  

  const successUpdate = () => {
    message.success({
      content: "Votre profil a ??t?? mis ?? jour avec succ??s",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const errorUpdate = () => {
    message.error({
      content: "Oups petite erreur, votre profil n'a pas pu ??tre mis ?? jour.",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  console.log(userData)

  

  // const onChange = e => {
  //   setValue(e.target.value);
  //   setEntreprise(e.target.value)
  //   console.log(nomEntreprise);
  //   console.log(siret);

  // };

  return (
    <Layout>
      <Affix>
        <Nav />
      </Affix>
      <Layout>
        <Header />
        <Content
          className="site-layout-background">

          <Title level={1}>Gestion du profil</Title>

          <Form
            labelCol={{
              span: 12,
            }}
            wrapperCol={{
              span: 22,
            }}
            layout="vertical">

            <Row gutter={[8, 8]}>
              <Col md={8} xs={24}>
                <Form.Item label="Soci??t??">
                  <Input
                    value={nomEntreprise}
                    name="nomEntreprise"
                    style={styleInput}
                    onChange={(e) => setEntreprise(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Siret"
                  hidden={userData.role == "ambulance" ? false : true}
                >
                  <Input
                    value={siret}
                    name="siret"
                    style={styleInput}
                    onChange={(e) => setSiret(e.target.value)} />
                </Form.Item>

                <Form.Item label="Email">
                  <Input
                    value={userData.email}
                    name="email"
                    style={styleInput}
                    onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item label="T??l??phone" >
                  <Input
                    value={userData.phone}
                    name="phone"
                    style={styleInput}
                    onChange={(e) => setPhone(e.target.value)} />
                </Form.Item>

                <Form.Item label="Poste">
                  <Input
                    value={role}
                    name="occupation"
                    style={styleInput}
                    onChange={(e) => setRole(e.target.value)} />
                </Form.Item>

              </Col>
              <Col md={8} xs={24} >

                <Form.Item label="Adresse" >
                  <Input
                    value={adresse}
                    name='adresse'
                    onChange={(e) => setAdresse(e.target.value)}
                    style={styleInput} />
                </Form.Item>

                <Form.Item label="Code Postal">
                  <Input
                    style={styleInput}
                    onChange={(e) => setCodePostal(e.target.value)} />
                </Form.Item >

                <Form.Item label="Ville">
                  <Input
                    value={city}
                    style={styleInput}
                    onChange={(e) => setCity(e.target.value)} />
                </Form.Item>

                <Form.Item label="Nom">
                  <Input
                    value={lastname}
                    name="lastname"
                    style={styleInput}
                    onChange={(e) => setLastname(e.target.value)} />
                </Form.Item>

                <Form.Item label="Pr??nom" >
                  <Input
                    value={firstname}
                    name="firstname"
                    style={styleInput}
                    onChange={(e) => setFirstname(e.target.value)} />
                </Form.Item>

              </Col>
              <Col md={8} xs={24} >

                <Form.Item label="Changer mot de passe">
                  <Input.Password
                    value={password}
                    name="password"
                    placeholder="input password"
                    style={styleInput}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item label="Changer mot de passe">
                  <Input.Password
                    name="password"
                    placeholder="input password"
                    style={styleInput}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Button
                  type="primary"
                  disabled={pristine || submitting}
                  htmlType="submit"
                  onClick={() => UpdateProfil()}
                  style={{
                    fontSize: "17px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  type="primary">Valider</Button>
              </Col>
            </Row>
          </Form>

        </Content>
        <FooterDash />

      </Layout>
    </Layout>
  )
}



const styleInput = {
  fontSize: "15px",
  color: "#B170FF",
  borderRadius: "15px",
};
