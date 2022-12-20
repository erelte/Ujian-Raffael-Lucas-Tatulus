import React, { useEffect, useState, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import { StyleSheet, Text, View ,TextInput, SafeAreaView  } from 'react-native';

const infoBitcoin = "https://www.blockchain.com/ticker";
const konvBitcoin = "https://www.blockchain.com/";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Info</Link>
            </li>
            <li>
              <Link to="/RtB">Konversi Rupiah ke Bitcoin</Link>
            </li>
            <li>
              <Link to="/BtR">Bitcoin ke Rupiah</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/RtB">
            <RtB />
          </Route>
          <Route path="/BtR">
            <BtR />
          </Route>
          <Route path="/">
            <Info />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Info() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(infoBitcoin).then((response) => {
      setPost(response.data);
    });
  }, []);

  console.log(post);
  if (!post) return null;

  return (
    <div>
      <h1>Harga Bitcoin Hari ini</h1>
      <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <tr>
          <th>Mata Uang</th>
          <th>Harga Beli Bitcoin</th>
          <th>Harga Jual Bitcoin</th>
        </tr>
        <tr>
          <td>Dollar Australia</td>
          <td>{post.AUD.buy}</td>
          <td>{post.AUD.sell}</td>
        </tr>
        <tr>
          <td>Euro Eropa</td>
          <td>{post.EUR.buy}</td>
          <td>{post.EUR.sell}</td>
        </tr>
        <tr>
          <td>Poundsterling Inggris</td>
          <td>{post.GBP.buy}</td>
          <td>{post.GBP.sell}</td>
        </tr>
        <tr>
          <td>Yen Jepang</td>
          <td>{post.JPY.buy}</td>
          <td>{post.JPY.sell}</td>
        </tr>
        <tr>
          <td>Dollar Amerika</td>
          <td>{post.USD.buy}</td>
          <td>{post.USD.sell}</td>
        </tr>
      </table>
    </div>
  );
}

function RtB() {
  const [post, setPost] = React.useState(null);
  const [usd, setUsd] = React.useState(null);

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  function handleChange(event) {
    var usd = event.target.value / 14000;
    setUsd(usd);
    axios.get(konvBitcoin + "tobtc?currency=USD&value=" + usd).then((response) => {
      setPost(response.data);
    });
    console.log(usd);
  }
  return (
    <SafeAreaView>
      <h2>Konversi Rupiah ke Bitcoin</h2>
      <h2>Kurs 1 USD = 14.000</h2>
      <input  style={styles.input} name="firstName" onChange={handleChange} />
      <h1>RP 14000 = BTC {post}</h1>
    </SafeAreaView>
  );

}

function BtR() {
  const [post, setPost] = React.useState(null);
  const [rp, setRp] = React.useState(null);

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  React.useEffect(() => {
    axios.get(infoBitcoin).then((response) => {
      setPost(response.data);
    });
  }, []);
  function handleChange(event) {
    var btc = event.target.value;
    var usd = post.USD.sell * btc;
    setRp(usd * 14000);
    console.log(usd);
  }
  return (
    <SafeAreaView>
      <h2>Konversi Bitcoin ke Rupiah</h2>
      <h2>Kurs 1 USD = 14.000</h2>
      <input  style={styles.input} name="firstName" onChange={handleChange} />
      <h1>BTC 1 = RP {rp}</h1>
    </SafeAreaView>
  );

}