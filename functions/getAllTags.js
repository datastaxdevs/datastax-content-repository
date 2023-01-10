const { getCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  
  async function findTagsRecursive (pagestate, alltags = [])  {
    const tags = await getCollection();
      
    if (pagestate) { 
      res = await tags.find({}, { "page-state": pagestate });
    } else {
      res = await tags.find({})
    }
  
    let result = Object.values(res.data);
  
    for (let i = 0; i < result.length; i++) {
      alltags.push(result[i])
    }
  
    if (result.length === 20 && res.pageState) {
      alltags = await findTagsRecursive(res.pageState, alltags)
    }
    return alltags
  }

  try {
    let response = await findTagsRecursive();
    return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

