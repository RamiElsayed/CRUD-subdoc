const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const { User, Application } = require("../models");

const generateTags = (numberOfTags) => {
  const tagsArray = new Array(numberOfTags).fill("");

  return tagsArray.map(() => {
    return {
      tagBody: faker.random.word().toLowerCase(),
    };
  });
};
const generateApplications = (numberOfApplications, tags) => {
  const applicationsArray = new Array(numberOfApplications).fill("");

  const getTags = () => {
    const randomNumberOfTags = faker.random.numeric(1);

    const newTagsArray = new Array(+randomNumberOfTags).fill("");

    const newTags = newTagsArray.map(() => {
      const randomTagIndex = Math.floor(Math.random() * tags.length);
      const randomTag = tags[randomTagIndex];

      return randomTag;
    });
    return newTags;
  };
  return applicationsArray.map(() => {
    return {
      published: Math.random() < 0.5,
      buildSuccess: Math.random() < 0.5,
      description: faker.lorem.sentences(2),
      tags: getTags(),
    };
  });
};

const generateUsers = (numberOfUsers) => {
  const usersArray = new Array(numberOfUsers).fill("");

  return usersArray.map(() => {
    return {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      age: +faker.random.numeric(2),
      applications: [],
    };
  });
};
const init = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/developersApplications", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[INFO]: Database connection successful");

    await Application.deleteMany({});
    await User.deleteMany({});

    const tags = generateTags(50);

    const applications = generateApplications(30, tags);
    await Application.insertMany(applications);
    console.log("[INFO]: Successfully seeded applications");

    const users = generateUsers(8);

    const applicationsFromDb = await Application.find({});

    const applicationIds = applicationsFromDb.map((application) => {
      return application.get("_id");
    });

    const usersWithApplications = users.map((user) => {
      const randomNumberOfApplications = +faker.random.numeric(1);

      const applications = new Array(randomNumberOfApplications)
        .fill("")
        .map(() => {
          const randomApplicationIdIndex = Math.floor(
            Math.random() * applicationIds.length
          );

          const randomApplicationId = applicationIds
          [randomApplicationIdIndex];

          return randomApplicationId;
        });

      user.applications = applications;

      return user;
    });
    await User.insertMany(usersWithApplications)

    console.log("[INFO]: Successfully seeded users");
  } catch (error) {
    console.log(`[ERROR]: Failed to get all data | ${error.message}`);
  }

  process.exit(0);
};

init();
