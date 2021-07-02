import React from "react";
import AddCategory from "./views/category/addCategory";
import EditCategory from "./views/category/editCategory";
import AddCity from "./views/cities/addCities";
import EditCity from "./views/cities/editCities";
import AddCoupon from "./views/coupon/addCoupon";
import EditCoupon from "./views/coupon/editCoupon";
import EditProviderApproval from "./views/providerApproval/editProviderApproval";
import managereviews from "./views/managereviews";
import editReviews from "./views/managereviews/editReviews";
import bookings from "./views/bookings";
import editBookings from "./views/bookings/editBookings";
import viewalllbookings from "./views/groupbooking";
import creategroupbooking from "./views/groupbooking/creategroupbooking";
import UserManagement from "./views/userManagement";
import EditUserManagement from "./views/userManagement/editUsers";
import approvedgroupbooking from "./views/groupbooking/viewgroupbooking";
import viewbookingstatistics from "./views/groupbooking/viewbookingstatistics";
import ProviderManagement from "./views/providerManagement";
import Sessions from "./views/sessions";
import editsessions from "./views/sessions/editsessions";

// import EditProviderManagement from "./views/ProviderManagement/editProvider";
// import creategroupbooking from "./views/groupbooking/creategroupbooking";
// import approvedgroupbooking from "./views/groupbooking/viewgroupbooking";
import ExperienceAvailibilty from "./views/viewExperienceAvailibilityReminder";
import editProvider from "./views/providerManagement/editProvider";

// examples
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Category = React.lazy(() => import("./views/category"));
const ProviderApproval = React.lazy(() => import("./views/providerApproval"));
const City = React.lazy(() => import("./views/cities"));
const Coupon = React.lazy(() => import("./views/coupon"));
// const EditCategory = React .lazy(() => import('./views/category/editCategory'))
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

const Accordion = React.lazy(() =>
  import("./views/components/base/accordion/Accordion")
);
const Breadcrumbs = React.lazy(() =>
  import("./views/components/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/components/base/cards/Cards"));
const Carousels = React.lazy(() =>
  import("./views/components/base/carousels/Carousels")
);
const Collapses = React.lazy(() =>
  import("./views/components/base/collapses/Collapses")
);
const ListGroups = React.lazy(() =>
  import("./views/components/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/components/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/components/base/paginations/Paginations")
);
const Popovers = React.lazy(() =>
  import("./views/components/base/popovers/Popovers")
);
const Progress = React.lazy(() =>
  import("./views/components/base/progress/Progress")
);
const Spinners = React.lazy(() =>
  import("./views/components/base/spinners/Spinners")
);
const Tables = React.lazy(() =>
  import("./views/components/base/tables/Tables")
);
const Tooltips = React.lazy(() =>
  import("./views/components/base/tooltips/Tooltips")
);

const Buttons = React.lazy(() =>
  import("./views/components/buttons/buttons/Buttons")
);
const ButtonGroups = React.lazy(() =>
  import("./views/components/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(() =>
  import("./views/components/buttons/dropdowns/Dropdowns")
);

const ChecksRadios = React.lazy(() =>
  import("./views/components/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(() =>
  import("./views/components/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(() =>
  import("./views/components/forms/form-control/FormControl")
);
const InputGroup = React.lazy(() =>
  import("./views/components/forms/input-group/InputGroup")
);
const Layout = React.lazy(() =>
  import("./views/components/forms/layout/Layout")
);
const Range = React.lazy(() => import("./views/components/forms/range/Range"));
const Select = React.lazy(() =>
  import("./views/components/forms/select/Select")
);
const Validation = React.lazy(() =>
  import("./views/components/forms/validation/Validation")
);

const CoreUIIcons = React.lazy(() =>
  import("./views/components/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/components/icons/flags/Flags"));
const Brands = React.lazy(() =>
  import("./views/components/icons/brands/Brands")
);

const Alerts = React.lazy(() =>
  import("./views/components/notifications/alerts/Alerts")
);
const Badges = React.lazy(() =>
  import("./views/components/notifications/badges/Badges")
);
const Modals = React.lazy(() =>
  import("./views/components/notifications/modals/Modals")
);
const Toasts = React.lazy(() =>
  import("./views/components/notifications/toasts/Toasts")
);

// const Login = React.lazy(() => import('./views/examples/pages/login/Login'))
// const Register = React.lazy(() => import('./views/examples/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/examples/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))

const Widgets = React.lazy(() => import("./views/components/widgets/Widgets"));

const Charts = React.lazy(() => import("./views/components/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/category", name: "Category", component: Category, exact: true },
  {
    path: "/userManagement",
    name: "User Management",
    component: UserManagement,
    exact: true,
  },
  {
    path: "/Sessions",
    name: "User Management", // bread but now off
    component: Sessions,
    exact: true,
  },
  {
    path: "/Sessions/editsessions/:id",
    name: "User Management", // bread but now off
    component: editsessions,
    // exact: true,
  },
  {
    path: "/experienceAvailibilty",
    name: "Experience Availibilty Reminder",
    component: ExperienceAvailibilty,
    exact: true,
  },
  {
    path: "/providerManagement",
    name: "Provider Management",
    component: ProviderManagement,
    exact: true,
  },
  { path: "/category/add", name: "Add Category", component: AddCategory },
  {
    path: "/category/edit/:id",
    name: "Edit Category",
    component: EditCategory,
  },
  {
    path: "/userManagement/edit/:id",
    name: "Edit User Management",
    component: EditUserManagement,
  },
  {
    path: "/providerManagement/edit/:id",
    name: "Edit Provider Management",
    component: editProvider,
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: bookings,
    // exact: true,
  },

  {
    path: "/groupbooking",
    name: "viewalllbookings",
    component: viewalllbookings,
    exact: true,
  },

  {
    path: "/groupbooking/approvedgroupbooking/:id",
    name: "approvedgroupbooking",
    component: approvedgroupbooking,
  },
  {
    path: "/groupbooking/viewbookingstatistics",
    name: "viewbookingstatistics",
    component: viewbookingstatistics,
    // exact: true,
  },
  {
    path: "/groupbooking/creategroupbooking",
    name: "creategroupbooking",
    component: creategroupbooking,
  },

  {
    path: "/bookingdetails/edit/:id",
    name: "editBookings",
    component: editBookings,
  },
  {
    path: "/request",
    name: "Provider Approval",
    component: ProviderApproval,
    exact: true,
  },
  {
    path: "/reviews",
    name: "Manage Reviews",
    component: managereviews,
    exact: true,
  },
  {
    path: "/request/edit/:id",
    name: "Edit Provider Approval",
    component: EditProviderApproval,
  },
  {
    path: "/reviews/edit/:id",
    name: "Edit Review",
    component: editReviews,
  },
  { path: "/city", name: "City", component: City, exact: true },
  { path: "/city/add", name: "Add City", component: AddCity },
  { path: "/city/edit/:id", name: "Edit City", component: EditCity },
  { path: "/coupon", name: "Coupon", component: Coupon, exact: true },
  { path: "/coupon/add", name: "Add Coupon", component: AddCoupon },
  { path: "/coupon/edit/:id", name: "Edit Coupon", component: EditCoupon },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", component: Accordion },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress", name: "Progress", component: Progress },
  { path: "/base/spinners", name: "Spinners", component: Spinners },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", component: Dropdowns },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/forms", name: "Forms", component: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", component: FormControl },
  { path: "/forms/select", name: "Select", component: Select },
  {
    path: "/forms/checks-radios",
    name: "Checks & Radios",
    component: ChecksRadios,
  },
  { path: "/forms/range", name: "Range", component: Range },
  { path: "/forms/input-group", name: "Input Group", component: InputGroup },
  {
    path: "/forms/floating-labels",
    name: "Floating Labels",
    component: FloatingLabels,
  },
  { path: "/forms/layout", name: "Layout", component: Layout },
  { path: "/forms/validation", name: "Validation", component: Validation },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toasts", name: "Toasts", component: Toasts },
  // { path: '/login', name: 'Login', component: Login },
  // { path: '/register', name: 'Register', component: Register },
  // { path: '/404', name: '404', component: Page404 },
  // { path: '/500', name: '500', component: Page500 },
  { path: "/widgets", name: "Widgets", component: Widgets },
];

export default routes;
