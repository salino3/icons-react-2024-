import "./App.scss";
import { CustomIconList } from "./components";

function App() {
  return (
    <div
      style={{
        backgroundColor: "blue",
      }}
    >
      <h1>Icon Demo</h1>
      <div className="boxIcon">
        <CustomIconList
          customStyles="triangle_icon"
          userToken="valid_token_marioemail_1"
          iconName="triangle_icon"
          color="red"
          shadow="12px 4px 6px rgba(120, 260, 120, 0.5)"
          size={293}
        />
      </div>
    </div>
  );
}

export default App;
