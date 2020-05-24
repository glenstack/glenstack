import btoa from "btoa";

export const subscribe = async (request) => {
  try {
    const { email } = await request.json();
    if (!email) throw new Error("Email required");

    const body = new FormData();
    body.append("address", email);
    body.append("upsert", "yes");

    const response = await fetch(
      "https://api.eu.mailgun.net/v3/lists/public@mg.glenstack.com/members",
      {
        method: "POST",
        body,
        headers: {
          Authorization: "Basic " + btoa(`api:${MAILGUN_API_TOKEN}`),
        },
      }
    );

    return new Response(JSON.stringify({ success: response.ok }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(null, { status: 400 });
  }
};
