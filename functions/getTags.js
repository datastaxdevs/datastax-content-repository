const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
    
  const tags = await getCollection();
  try {
    const res = await tags.find();
    const formattedTags = Object.keys(res.data).map((item) => res.data[item]);
    if (res.pageState) {
      formattedTags["pageState"] = res.pageState
    }
    return {
      statusCode: 200,
      body: JSON.stringify(formattedTags),
      headers: {"page-tate": res.pageState}
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

