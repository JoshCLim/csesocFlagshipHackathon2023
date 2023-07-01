const BACKEND_URL = process.env.BACKEND_URL;

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

  return await fetch(`${BACKEND_URL}${route}`, { method, headers, body });
};

export default backend;
