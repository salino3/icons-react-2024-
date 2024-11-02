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
          iconName="F_icon"
          color="blue"
          shadow="12px 4px 6px rgba(120, 260, 120, 0.5)"
          size={293}
        />
      </div>
    </div>
  );
}

export default App;
