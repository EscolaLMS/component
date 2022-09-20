import React, { useEffect, useMemo } from "react";
import { DefaultTheme } from "styled-components";
// TODO UNDO
import themes from "../theme";
import { useControls, folder, Leva } from "leva";
import { useLocalTheme } from "./useLocalTheme";

// TODO Remove
// const themes = { blueTheme: _themes.blueTheme };

const allowedKeys: (keyof DefaultTheme & string)[] = [
  "font",
  "theme",
  "mode",
  "primaryColor",
  "dm__primaryColor",
  "secondaryColor",
  "dm__secondaryColor",
  "background",
  "dm__background",
  "cardBackgroundColor",
  "dm__cardBackgroundColor",
  "textColor",
  "dm__textColor",
  "errorColor",
  "dm__errorColor",
  "invertColor",
  "inputDisabledBg",
  "dm__inputDisabledBg",
  "labelListValueColor",
  "dm__labelListValueColor",
  "outlineButtonColor",
  "dm__outlineButtonInvertColor",
  "breadcrumbsColor",
  "dm__breadcrumbsColor",
  "primaryButtonDisabled",
  "dm__primaryButtonDisabled",
  "outlineButtonColor",
  "dm__outlineButtonColor",
  "outlineButtonInvertColor",
  "buttonRadius",
  "checkboxRadius",
  "inputRadius",
  "noteRadius",
  "cardRadius",
  "white",
  "gray5",
  "gray4",
  "gray3",
  "gray2",
  "gray1",
  "black",
];

const filterInputData = (input: DefaultTheme) => {
  return allowedKeys.reduce(
    (acc: Partial<DefaultTheme>, curr: string & keyof DefaultTheme) => {
      return typeof input[curr] !== "undefined"
        ? { ...acc, [curr]: input[curr] }
        : acc;
    },
    {}
  );
};

export const ThemeCustomizer: React.FC<{
  onUpdate: (theme: DefaultTheme) => void;
  hasAll?: boolean;
  hidden?: boolean;
}> = ({ onUpdate, hasAll = false, hidden = false }) => {
  const [localTheme] = useLocalTheme();

  const initData = useMemo(() => {
    return filterInputData(localTheme);
  }, []);

  const [props, set] = useControls(() => ({
    theme: {
      label: "Theme",
      value: hasAll
        ? initData.theme || "all"
        : initData.theme || Object.keys(themes)[0],
      options: hasAll
        ? ["all", ...Object.keys(themes), "custom"]
        : [...Object.keys(themes), "custom"],
      onChange: (theme: string) => {
        switch (theme) {
          case "all":
          case "custom":
            break;
          default:
            set({
              theme,
              ...filterInputData(themes[theme as keyof typeof themes]),
            });
        }
      },
      transient: false,
    },
    mode: {
      options: ["light", "dark"],
      value: initData.mode || "light",
    },

    Customize: folder(
      {
        font: {
          options: ["Inter", "Mulish", "Titillium"],
          value: initData.font || "Inter",
        },
        "Main Colors": folder({
          primaryColor: initData.primaryColor || "#000000",
          dm__primaryColor: initData.dm__primaryColor || "#000000",
          secondaryColor: initData.secondaryColor || "#000000",
          dm__secondaryColor: initData.dm__secondaryColor || "#000000",
          background: initData.background || "#000000",
          dm__background: initData.dm__background || "#000000",
          cardBackgroundColor: initData.cardBackgroundColor || "#000000",
          dm__cardBackgroundColor:
            initData.dm__cardBackgroundColor || "#000000",
          textColor: initData.textColor || "#000000",
          dm__textColor: initData.dm__textColor || "#000000",
          errorColor: initData.errorColor || "#EB5757",
          dm__errorColor: initData.dm__errorColor || "#EB5757",
          invertColor: initData.invertColor || "#000000",
        }),
        "Body Colors": folder({
          inputDisabledBg: initData.inputDisabledBg || "#000000",
          dm__inputDisabledBg: initData.dm__inputDisabledBg || "#000000",
          labelListValueColor: initData.labelListValueColor || "#000000",
          dm__labelListValueColor:
            initData.dm__labelListValueColor || "#000000",
          primaryButtonDisabled: initData.primaryButtonDisabled || "#000000",
          dm__primaryButtonDisabled:
            initData.dm__primaryButtonDisabled || "#000000",
          outlineButtonColor: initData.outlineButtonColor || "#000000",
          dm__outlineButtonColor: initData.dm__outlineButtonColor || "#000000",
          outlineButtonInvertColor:
            initData.outlineButtonInvertColor || "#000000",
          dm__outlineButtonInvertColor:
            initData.dm__outlineButtonInvertColor || "#000000",
          // breadcrumbsColor: initData.breadcrumbsColor || "#000000",
          breadcrumbsColor: initData.breadcrumbsColor || "#bbbbbb",
          dm__breadcrumbsColor: initData.dm__breadcrumbsColor || "#000000",
        }),
        "Utility Colors": folder({
          white: initData.white || "#000000",
          gray5: initData.gray5 || "#000000",
          gray4: initData.gray4 || "#000000",
          gray3: initData.gray3 || "#000000",
          gray2: initData.gray2 || "#000000",
          gray1: initData.gray1 || "#000000",
          black: initData.black || "#000000",
        }),
        Radiuses: folder({
          buttonRadius: {
            min: 0,
            max: 16,
            step: 1,
            value: initData.buttonRadius || 0,
          },
          checkboxRadius: {
            min: 0,
            max: 5,
            step: 1,
            value: initData.checkboxRadius || 0,
          },
          inputRadius: {
            min: 0,
            max: 16,
            step: 1,
            value: initData.inputRadius || 0,
          },
          cardRadius: {
            min: 0,
            max: 16,
            step: 1,
            value: initData.cardRadius || 0,
          },
        }),
      },

      {
        render: (get) => get("theme") === "custom",
      }
    ),
  }));

  useEffect(() => {
    onUpdate(props as DefaultTheme);
  }, [props]);

  return <Leva hidden={hidden} />;
};

export default ThemeCustomizer;
