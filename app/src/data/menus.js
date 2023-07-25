// import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faFutbol,
  faRankingStar,
  // faNotdef
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
  {
    label: 'Index'
  },
  {
    label: "Standings",
    path: "/standings",
    icon: faRankingStar,
  },
  {
    label: "Statistics",
    path: "/statistics",
    icon: faFutbol,
  },

  {
    label: 'Player Pages'
  },
  // {
  //   label: "Form",
  //   path: "/form",
  //   icon: faWindows,
  // },
  {
    label: "Draft Class Tracker",
    path: "/draftClass",
    icon: faTable,
  },

  // {
  //   label: 'Authentication'
  // },
  // {
  //   label: "Login",
  //   path: "/auth/login",
  //   icon: faLock,
  // },
  // {
  //   label: "Register",
  //   path: "/auth/register",
  //   icon: faNoteSticky,
  // },
];

export default initMenu