import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/leads",
            alias: "/leads",
            name: "leads",
            component: () => import("./components/ListLeads")
        },
        {
            path: "/add",
            alias: "/add",
            name: "add",
            component: () => import("./components/AddLeads")
        },
    ]
});