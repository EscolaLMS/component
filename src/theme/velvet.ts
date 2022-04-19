import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";

export const velvetTheme: DefaultTheme = {
  primaryColor: "#600CAE",
  secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  buttonRadius: 0,
  checkboxRadius: 0,
  headerColor: "#111111",
};

export default velvetTheme;
