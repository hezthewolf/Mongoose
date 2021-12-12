const mongoose = require("mongoose");
const User = require("./user");

mongoose.connect("mongodb://localhost/mongoose"); //Takes the URL to your DB, A function that is called every time you connect and a callback for an error

const run = async () => {
  try {
    const user = new User({
      //   user.findById().save() //Use this instead of ".findOneAndUpdate" because those methods don't go through validation
      name: "Hez",
      age: 20,
      email: "gajujufakyask.gmail.com",
      hobbies: ["Gaming", "Music", "Cycling"],
      address: {
        street: "125Street",
        city: "Nairobi",
      },
    });
    await user.save(); // Awaits and Saves a user to the database
    //   console.log(user);

    //                                               OTHER METHODS
    const user1 = await User.findById("61aa1f2ae26b0d50b2bbcac8");
    console.log(user1);
    user1.sayHi(); //.findById()
    // const user = await User.findOne({name: "Hez"}) //Works the same way as in MongoDB [.find() // .findOne() //.exists //.deleteOne() //.deleteMany()]
    // const user = await User.where("name").equals("Hez")  //You can create your own find syntax using helper methods
    // const user = await User.where("age").gt("12")  //You can create your own find syntax using helper methods
    //   const user = await User.where("age").gt("12").where("name").equals("Hez").populate("bestFriend").limit(1).select("age"); //You can join two/ more of them together.
    //   user[0].bestFriend = "61aa14f60f5b62bdf2fca874";
    //  await user[0].save()
    // console.log(user)

    //                                             STATIC METHODS
    // const user2 = await User.findByName("Hez")
    // console.log(user2)

    //                                             QUERY METHODS
    // const user3 = await User.find().byName("Hez");
    // console.log(user3)

    //                                            VIRTUAL
    console.log(user1.namedEmail);

    //                                             MIDDLEWARE

  } catch (err) {
    console.log(err.message);
  }
};

run();
