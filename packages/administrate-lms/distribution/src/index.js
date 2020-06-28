import qr from "qr-image";

const NOT_FOUND = new Response(null, { status: 404 });

export const handleEvent = (event) => {
  const { request } = event;

  if (request.method.toUpperCase() !== "GET") return NOT_FOUND;

  const url = new URL(request.url);

  switch (url.pathname) {
    case "/":
      return new Response(
        `<!DOCTYPE html>
<html>
<body>
<h1>Android</h1>
<img src="/android.png" />
<h1>iOS</h1>
<img src="/ios.png" />
</body>
</html>`,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    case "/android.png":
      return new Response(
        qr.imageSync(`exp://${url.host}/android-index.json`),
        { headers: { "Content-Type": "image/png" } }
      );
    case "/ios.png":
      return new Response(qr.imageSync(`exp://${url.host}/ios-index.json`), {
        headers: { "Content-Type": "image/png" },
      });
  }

  return NOT_FOUND;
};
