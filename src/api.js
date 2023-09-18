import axios from "axios";
const login = "antilaman3113@gmail.com";
const password = "181e9f1df0195a55";

export async function getLighthouseReport(url) {
  const categoryArr = [];
  const post_array = [];
  post_array.push({
    url: url,
    for_mobile: true,
    tag: "some_string_123"
  });
  try {
    const response = await axios({
      method: "post",
      url: "https://api.dataforseo.com/v3/on_page/lighthouse/live/json",
      auth: {
        username: login,
        password: password
      },
      data: post_array,
      headers: {
        "content-type": "application/json"
      }
    });
    const data = await response["data"]["tasks"];
    const { result } = data[0];
    const { audits, categories } = result[0];

    Object.values(categories).forEach((category) => {
      const { auditRefs, description, score, title } = category;
      const categoryAudits = auditRefs
        .slice(0, 20)
        .map((ref) => Object.values(audits).find((item) => item.id === ref.id));
      categoryArr.push({ title, description, score, categoryAudits });
    });
    return categoryArr;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOnPageReport(url) {
  const post_array = [];
  post_array.push({
    url: "https://antil-aman.vercel.app/",
    enable_javascript: true,
    custom_js: "meta = {}; meta.url = document.URL; meta;"
  });

  try {
    const response = axios({
      method: "post",
      url: "https://api.dataforseo.com/v3/on_page/instant_pages",
      auth: {
        username: login,
        password: password
      },
      data: post_array,
      headers: {
        "content-type": "application/json"
      }
    });
    const apiData = await response;
    const responseData = apiData?.data?.tasks[0];
    const result = responseData?.result[0];
    return result?.items[0];
  } catch (error) {
    throw new Error(error);
  }
}
