const { getCollection } = require("./utils/astraClient");

// Get 20 tags from the collection, with associated apps

exports.handler = async (event, context) => {
    
  const tags = await getCollection();
  try {
    const res = await tags.find();
    const formattedTags = Object.keys(res.data).map((item) => res.data[item]);

    return {
      statusCode: 200,
      body: JSON.stringify(formattedTags),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

