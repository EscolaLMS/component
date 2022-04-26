import React, { useCallback, useEffect, useRef, useState } from "react";
import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString,
  DatFolder,
} from "react-dat-gui";
import { orangeTheme as defaultTheme } from "./../theme/orange";

import { DefaultTheme, ThemeProvider } from "styled-components";

import themes from "../theme";
import { getFontFromTheme, getThemeFromLocalStorage } from "../theme/provider";

export const ThemeCustomizer: React.FC<{
  onUpdate: (theme: DefaultTheme) => void;
}> = ({ onUpdate }) => {
  const [state, setState] = useState<DefaultTheme>(
    getThemeFromLocalStorage(defaultTheme)
  );

  // Update current state with changes from controls
  const handleUpdate = useCallback((newData: DefaultTheme) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  useEffect(() => {
    onUpdate(state);
  }, [state]);

  return (
    <div>
      {Object.values(themes).map((theme) =>
        getFontFromTheme(theme).links.map((link) => (
          <link key={link} rel="stylesheet" href={link} />
        ))
      )}
      <DatGui data={state} onUpdate={handleUpdate}>
        <DatPresets
          label="Presets"
          // @ts-ignore // bug in the library
          options={[themes]}
          onUpdate={handleUpdate}
        />
        <DatSelect path="mode" options={["light", "dark"]} />
        <DatSelect path="font" options={["Inter", "Mulish", "Titillium"]} />
        <DatFolder title="Colors" closed={false}>
          <DatColor path="primaryColor" label="Primary Color" />
          <DatColor path="secondaryColor" label="Secondary Color" />
          <DatColor path="backgroundDark" label="Background Dark Color" />
          <DatColor path="backgroundLight" label="Background Light Color" />
          <DatColor path="textColorDark" label="Text Dark Color" />
          <DatColor path="textColorLight" label="Text Light Color" />
        </DatFolder>
        <DatFolder title="Radiuses" closed={false}>
          <DatNumber
            path="buttonRadius"
            label="Button Radius"
            min={0}
            max={100}
            step={1}
          />
          <DatNumber
            path="checkboxRadius"
            label="Checkbox Radius"
            min={0}
            max={5}
            step={1}
          />
        </DatFolder>
      </DatGui>
    </div>
  );
};

export default ThemeCustomizer;
