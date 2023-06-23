import MainNavigation from "./MainNavigation";

import CardContainer from "../CardContainer";


function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <div className="content">
        <div className="container mt-4">
        {props.children}
      </div>
    </div>
    </div>
  );
}

export default Layout;
