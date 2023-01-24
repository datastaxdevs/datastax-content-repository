const { getCollection } = require("./utils/astraVideoClient");

// Retrieve all tags, recursively grab the next block
// with pageState and combine together before returning

exports.handler = async (event, context) => {
  const videoCollection = await getCollection();
    
  async function findVideosRecursive(pagestate = null, allvideos = {}) {
    if (pagestate) {
      res = await videoCollection.find({}, { "page-state": pagestate });
    } else {
      res = await videoCollection.find({})
    }


    let result = Object.values(res.data);

    for (let i = 0; i < result.length; i++) {
      let id = result[i]["id"]
      allvideos[id] = result[i]
    }

    if (result.length === 20 && res.pageState) {
      allvideos = await findVideosRecursive(res.pageState, allvideos)
    }
      
    return allvideos
  }

  try {
    let response = await findVideosRecursive();
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

