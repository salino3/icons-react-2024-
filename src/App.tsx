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
          userToken="valid_token_marioemail_1"
          iconName="star_icon_2"
          color="yellow"
          shadow="12px 4px 6px rgba(120, 260, 120, 0.5)"
          size={220}
        />
      </div>
    </div>
  );
}

export default App;
