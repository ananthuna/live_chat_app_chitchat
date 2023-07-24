const userImageUpdate = (User, url) => {
    // console.log({...User});
  return { ...User, imageURL: url };
};

module.exports = { userImageUpdate };
