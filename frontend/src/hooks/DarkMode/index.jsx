import { useCallback, useEffect, useState } from "react";

export const useSimpleDarkMode = () => {
  // ローカルストレージからダークモードの初期状態を取得する
  const storedDarkMode = localStorage.getItem("darkMode");
  const isInitialDark = storedDarkMode ? JSON.parse(storedDarkMode) : false;

  const [isDarkMode, toggleTheme] = useState(isInitialDark);

  const toggle = useCallback((isDark) => {
    if (typeof isDark === "undefined") {
      toggleTheme((state) => {
        // 現在の状態をローカルストレージに保存する
        localStorage.setItem("darkMode", JSON.stringify(!state));
        return !state;
      });
      return;
    }

    // 指定された状態をローカルストレージに保存する
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    toggleTheme(isDark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggle };
};
