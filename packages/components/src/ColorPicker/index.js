import React from "react";
import { HuePicker } from "react-color";

export default ({ color, setColor }) => (
  <HuePicker color={color} onChangeComplete={color => setColor(color.hex)} />
);
