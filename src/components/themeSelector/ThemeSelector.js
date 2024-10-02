import { useTheme } from "../../hooks/useTheme";
import "./ThemeSelector.css";
import modeIcon from "../../assets/contrast_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const themeColors = ["#6945ec", "#20be20", "#07509e"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const ToggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  console.log(mode);
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img src={modeIcon} onClick={ToggleMode} style={{filter : mode === 'dark' ? 'invert(100%)' : "invert(10%)"}} alt="icon" />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            className="div"
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
