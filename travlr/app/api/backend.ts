// const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_URL = "http://localhost:4000";

interface FetchArguments {
  route: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  contentType?: string;
  body?: string | null;
  accessToken?: string;
  authRequired?: boolean;
}

const backend = async ({
  route,
  method = "GET",
  contentType = "application/json",
  body = null,
}: //   accessToken,
//   authRequired = false,
FetchArguments) => {
  const headers: HeadersInit = { "Content-Type": contentType };
  //   if (authRequired) headers["Authorization"] = `Bearer ${accessToken}`;
  console.log(`url is ${BACKEND_URL}`);

  try {
    const res = await fetch(`${BACKEND_URL}${route}`, { method, headers, body });
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default backend;
