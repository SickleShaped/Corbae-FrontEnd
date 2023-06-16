import Cookie from "js-cookie";

const SetCookie = (cookiename, usrin, expire) => {
  Cookie.set(
    cookiename,
    { usrin },
    {
      expires: expire,
      secure: true,
      sameSite: "strict",
      path: "/",
    }
  );
};

export default SetCookie;
