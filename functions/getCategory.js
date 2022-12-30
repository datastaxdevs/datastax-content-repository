const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const tag = event.queryStringParameters.tag
  //const filter = event.queryStringParameters.filter
  const apps = await getCollection();
  try {
    const res = await apps.find({ name: { $eq: tag } });
    const formattedTodos = Object.keys(res.data).map((item) => res.data[item]);
    console.log(formattedTodos)
    return {
      statusCode: 200,
      body: JSON.stringify(formattedTodos),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

