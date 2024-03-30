import config from "../../../tailwind.config";
const colors = config.theme.colors.base;
const searchStyle = {
  control: (styles) => ({
    ...styles,
    boxShadow: "none",
    outline: "none ",
    border: "none",
    padding: "0rem .5rem",
    height: "56px",
    borderRadius: ".5rem",
    overflow: "hidden",
    backgroundColor: colors[700],
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  input: (styles) => ({ ...styles, color: colors[100], width: "200px" }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: ".5rem",
    padding: 0,
    backgroundColor: colors[700],
  }),
  singleValue: (provided) => ({
    ...provided,
    color: colors[100],
  }),
  option: (styles, { isFocused }) => {
    return {
      ...styles,
      height: "48px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: isFocused ? colors[400] : colors[500],
      ":active": {
        undefined,
      },
      borderBottom: `1px solid ${colors[700]}`,
    };
  },
};

export default searchStyle;