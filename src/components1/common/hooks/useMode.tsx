import {useEffect, useState} from "react";

const useMode = (): {
    isCurrentDarkmode: boolean,
    setIsCurrentDarkmode: (value: boolean) => void;
} => {
    const [isCurrentDarkmode, setIsCurrentDarkmode] = useState<boolean>(() => {
        const darkModeWasSet = localStorage.getItem("darkmode");
        if (darkModeWasSet) return true;
        else return false;
    });

    useEffect(() => {
        const html = document.querySelector<HTMLHtmlElement>("html")!;
        if (isCurrentDarkmode) {
            html.classList.add("dark");
            localStorage.setItem("darkmode", "true");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#0f172a");
        } else {
            html.classList.remove("dark");
            localStorage.removeItem("darkmode");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#e2e8f0");
        }
    }, [isCurrentDarkmode]);

    return {isCurrentDarkmode, setIsCurrentDarkmode};
};

export default useMode;
