const { getCollection } = require("./utils/astraClient");

// get the associated applications for a specific tag

exports.handler = async (event, context) => {
  const tag = event.queryStringParameters.tag
  
  const apps = await getCollection();
  try {
    const res = await apps.find({ name: { $eq: tag } });
   
    const formattedTodos = Object.keys(res.data).map((item) => res.data[item]);
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

