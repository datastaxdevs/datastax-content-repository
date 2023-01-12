const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const apps = await getCollection();
  try {
    const res = await apps.find();
    const formattedTodos = Object.keys(res).map((item) => res[item]);
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

