import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [show, setShow] = useState("");
  const [update, setUpdate] = useState("");
  const click = () => {
    setShow(show ? false : true);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const loginreq = () => {
    axios.post("http://localhost:3001/api/insert", {
      uname: uname,
      password: password,
    });

    setPasswordList([...passwordList, { uname, password }]);
  };

  const deletelist = (password) => {
    axios
      .delete("http://localhost:3001/api/delete", { data: { password } })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updatelist = (e, s) => {
    var uname = e;
    var password = s;
    console.log(uname, password);
    axios
      .put("http://localhost:3001/api/update", {
        uname: uname,
        password: update,
      })
      .then(() => {
        setPasswordList(
          passwordList.map((item) => {
            if (item.uname === uname) {
              return { ...item, password: update };
            }
            return item;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
    setUpdate("");
  };

  return (
    <div>
      <div className="card">
        <form className="form">
          <h1> Login </h1>
          <label>User Name</label>
          <input
            type="text"
            name="uname"
            onChange={(e) => {
              setUname(e.target.value);
            }}
          />
          <div>
            <label>Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              autoComplete="on"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <input type="checkbox" className="btn-hide" onClick={click}></input>
          </div>
          <div>
            <button onClick={loginreq}>Login</button>
          </div>
        </form>
      </div>
      {passwordList.map((value) => {
        return (
          <div className="review">
            <h3> username:{value.uname}</h3>
            <h3> password:{value.password}</h3>
            <button className="btn" onClick={() => deletelist(value.password)}>
              {" "}
              delete{" "}
            </button>
            <input
              type="text"
              className="update"
              onChange={(e) => {
                setUpdate(e.target.value);
              }}
            ></input>
            <button
              className="btn"
              onClick={() => {
                updatelist(value.uname, value.password);
              }}
            >
              {" "}
              update{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
