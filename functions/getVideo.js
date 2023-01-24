const { getCollection } = require("./utils/astraVideoClient");

// Retrieve all tags, recursively grab the next block
// with pageState and combine together before returning

exports.handler = async (event, context) => {
  const id = event.queryStringParameters.id
    
  const videos = await getCollection();
  try {
    const res = await videos.get(id);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};