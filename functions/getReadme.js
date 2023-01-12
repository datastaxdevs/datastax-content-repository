const { getCollection } = require("./utils/astraReadmeClient");

exports.handler = async (event, context) => {
  const slug = event.queryStringParameters.slug
    
  const readmes = await getCollection();
  try {
    const res = await readmes.get(slug);
    return {
      statusCode: 200,
      body: JSON.stringify(res.content),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

