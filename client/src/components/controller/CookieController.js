
import Cookies from "js-cookie";

function CookieController() {

   try {
     var userCookieGroup = JSON.parse(Cookies.get("cred"));
     return userCookieGroup;

   } catch (error) {

    return 0;

   }

}

export default CookieController;