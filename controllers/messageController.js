import Message from "../models/MessageModel.js";
import { createMessageValidation } from "../helpers/validation.js";

export const createMessage = async (req, res) => {
  // Validate the request
  const { error } = createMessageValidation(req.body);
  if (error)
    return res.status(401).json({
      status: 401,
      error: {
        message: error.details[0].message,
      },
    });

  const message = new Message({
    sender: req.body.sender,
    message: req.body.message,
  });

  message
    .save()
    .then((result) => {
      res.status(201).json({
        status: 201,
        message: "Message created successfully.",
        data: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: 409,
        error: {
          message: err.message || "Some error while creating data!",
        },
      });
    });
}

export const getMessages = async (req, res) => {
  Message.find()
    .then((result) => {
      if (!result)
        return res.status(404).json({
          status: 404,
          error: {
            message: "Data not found!",
          },
        });
      res.status(200).json({
        status: 200,
        results: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: 409,
        error: {
          message: err.message || "Some error while retrieving data!",
        },
      });
    });
}

export const getMessageById = async (req, res) => {
  const id = req.params.id;

  Message.findById(id)
    .then((result) => {
      if (!result)
        return res.status(404).json({
          status: 404,
          error: {
            message: "Data not found!",
          },
        });

      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(409).json({
        status: 409,
        error: {
          message: err.message || "Some error while retrieving data!",
        },
      });
    });
}

export const deleteMessage = async (req, res) => {
  // Verify User if the user is Admin or not
  if (!req.user.isSuperuser)
    return res.status(403).json({
      status: 403,
      error: {
        message: "Forbidden Access!",
      },
    });

  const id = req.params.id;

  Message.findByIdAndDelete(id)
    .then((result) => {
      if (!result)
        return res.status(404).json({
          status: 404,
          error: {
            message: "Data not found!",
          },
        });

      res.status(204).json({
        status: 204,
        message: "Data deleted successfully.",
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: 409,
        error: {
          message: err.message || "Some error while deleting data!",
        },
      });
    });
};