export default async function handler(req, res) {
    const { endpoint = "organiser/events", ...query } = req.query;

    const search = new URLSearchParams(query).toString();
    const url = `https://billetto.dk/api/v3/${endpoint}?${search}`;

    const response = await fetch(url, {
        headers: {
            accept: "application/json",
            "Api-Keypair": process.env.BILLETTO_API_KEYPAIR,
        }
    });

    const data = await response.json();
    res.status(200).json(data);
}
