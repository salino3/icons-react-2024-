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
          // customStyles="triangle_icon"
          customStyles="circle_icon"
          userToken="valid_token_marioemail_1"
          iconName="circle_icon"
          color="purple"
          shadow="12px 4px 6px rgba(120, 260, 120, 0.5)"
          size={297}
        />

        <CustomIconList
          // customStyles="triangle_icon"
          customStyles="circle_icon"
          userToken="valid_token_marioemail_1"
          iconName="F_icon"
          color="yellow"
          shadow="12px 4px 6px rgba(120, 260, 120, 0.5)"
          size={207}
        />
      </div>
    </div>
  );
}

export default App;
