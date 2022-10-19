import axios from "axios";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <div className="App">Hejo</div>;
};

export default App;
