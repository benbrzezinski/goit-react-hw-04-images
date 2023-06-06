import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "34506283-a822befb32ba0acc5b07109c7";

const fetchPhotosByQuery = async (q, page, PER_PAGE) => {
  try {
    const resp = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q,
        image_type: "photo",
        orientation: "horizontal",
        page,
        per_page: PER_PAGE,
      },
    });

    return await resp.data;
  } catch (err) {
    console.error(err.stack);
  }
};

const Api = {
  fetchPhotosByQuery,
};

export default Api;
