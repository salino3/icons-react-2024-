import "./App.scss";
import { CustomIconList } from "./components";

function App() {
  return (
    <div>
      <h1>Icon Demo</h1>
      <CustomIconList
        userToken="valid-token"
        color="#FF5733"
        shadow="2px 4px 6px rgba(0, 0, 0, 0.5)"
        size={48}
      />
    </div>
  );
}

export default App;
