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
          customStyles="circle_icon"
          userToken="valid_token_marioemail_1"
          iconName="circle_icon"
          color="purple"
          // colorShadow="blue"
          shadow="shadow"
          size={307}
        />
        <div className="triangle_icon">
          <CustomIconList
            customStyles="triangle_icon"
            userToken="valid_token_marioemail_1"
            iconName="F_icon"
            color="black"
            colorShadow="red"
            shadow="7px 4px 16px"
            size={199}
            sizeHeight={289}
          />
        </div>
        <span className="icon_021">
          <CustomIconList
            customStyles="icon_022"
            userToken="valid_token_marioemail_1"
            iconName="square_icon"
            color="blue"
            shadow="7px 4px 16px  "
            size={199}
          />
        </span>
      </div>
    </div>
  );
}

export default App;
