import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Lojas from "@/pages/Lojas.vue";
import Empresas from "@/pages/Empresas.vue";
import Campanha from "@/pages/Campanha.vue";
import PDV from "@/pages/PDV.vue";
import OAB from "@/pages/OAB.vue";


import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "lojas",
        name: "Lojas",
        component: Lojas
      },
      {
        path: "empresas",
        name: "Empresas",
        component: Empresas
      },
      {
        path: "campanha",
        name: "Campanha",
        component: Campanha
      },
      {
        path: "pdv",
        name: "Ponto de Venda",
        component: PDV
      },
      {
        path: "oab",
        name: "OAB",
        component: OAB
      },


      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      }
    ]
  }
];

export default routes;
