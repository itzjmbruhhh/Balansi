import moonIcon from "@/assets/icons/filled/moon-solid-full.svg";
import sunIcon from "@/assets/icons/filled/sun-solid-full.svg";

export function getTimeGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour < 5 || hour >= 18) {
    return { text: "Good Evening!", icon: moonIcon };
  }

  if (hour < 12) {
    return { text: "Good Morning!", icon: sunIcon };
  }

  return { text: "Good Afternoon!", icon: sunIcon };
}
