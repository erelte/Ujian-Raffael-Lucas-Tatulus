import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
const infoBitcoin = "https://www.blockchain.com/ticker";

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
            <About />
          </Route>
          <Route path="/BtR">
            <Users />
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

function About() {
  return <h2>Konversi Rupiah ke Bitcoin</h2>;
}

function Users() {
  return <h2>Konversi Bitcoin ke Rupiah</h2>;
}