import Joi from "joi";
import db from "./connection";

// * username - default to anonymous
// * subject
// * message
// * imageURL
// * created

const schema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [/https?/],
  }),
});

const messages = db.get("messages");

function getAll() {
  return messages.find();
}

function create(message: any) {
  if (!message.username) message.username = "Anonymous";

  const result = Joi.valid(message, schema);
  if (result.error == null) {
    message.created = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
}

export default {
  create,
  getAll,
};
