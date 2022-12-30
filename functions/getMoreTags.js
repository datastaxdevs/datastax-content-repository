const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const pageState = event.queryStringParameters.pageState
  console.log(pageState)
  const tags = await getCollection();
  try {
    const res = await tags.findMore({}, pageState=pageState);
      const result = Object.values(res.data);
      console.log(tags)
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
  } catch (e) {
    console.log("ERR" + JSON.stringify(e))
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

