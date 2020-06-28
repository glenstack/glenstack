import qr from "qr-image";

const NOT_FOUND = new Response(null, { status: 404 });

export const handleEvent = (event) => {
  const { request } = event;

  if (request.method.toUpperCase() !== "GET") return NOT_FOUND;

  const url = new URL(request.url);
  const ANDROID_LINK = `exp://${url.host}/android-index.json`;
  const IOS_LINK = `exp://${url.host}/ios-index.json`;

  switch (url.pathname) {
    case "/":
      return new Response(
        `<!DOCTYPE html>
<html>
<body>
<h1>Android</h1>
<a href="${ANDROID_LINK}"><img src="/android.png" /></a>
<h1>iOS</h1>
<a href="${IOS_LINK}"><img src="/ios.png" /></a>
</body>
</html>`,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    case "/android.png":
      return new Response(qr.imageSync(ANDROID_LINK), {
        headers: { "Content-Type": "image/png" },
      });
    case "/ios.png":
      return new Response(qr.imageSync(IOS_LINK), {
        headers: { "Content-Type": "image/png" },
      });
  }

  return NOT_FOUND;
};
