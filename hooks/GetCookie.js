import Cookie from "js-cookie";

const GetCookie = (cookiename, usrin) => {
  Cookie.set(
    cookiename,
    { usrin },
    {
      expires: 1,
      secure: true,
      sameSite: "strict",
      path: "/",
    }
  );
};

export default GetCookie;
