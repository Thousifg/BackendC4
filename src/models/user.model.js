const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: true },
    roles: { type: String, required: true },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hash = bcrypt.hashSync("bacon", 10);
    this.password = hash;
    return next();
});

userSchema.methods.comparePassword  = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, match) {
            if(err) return reject(err);

            return resolve(match);
        })
    })
}

module.exports = model("users", userSchema);