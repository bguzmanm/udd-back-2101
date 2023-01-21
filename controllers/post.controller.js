const post = require("../models/post.model");
const user = require("../models/user.model");
const jwt = require("../auth/jwt");

const create = async (req, res) => {
  try {
    const { title, abstract, content } = req.body;
    const username = jwt.extractSub(req);
    const p = new post();
    if (title) {
      p.title = title;
      p.abstract = abstract;
      p.content = content;

      console.log(`creando post para ${username}`);
      const u = await user.findOne({ username: username });
      p.user = u;
      const result = await post.create(p);
      return res.json({
        msg: "Ok!",
        details: result
      });
    } else {
      return res.status(401).json({
        msg: "Error",
        details: "Request bad formed"
      });
    }
  }
  catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts",
      details: error.message
    });
  }
};

const findByUser = async (req, res) => {
  try {
    const username = jwt.extractSub(req)
    // console.log(`buscando post de ${username}`);
    const u = await user.findOne({ username: username });
    const result = await post.find({ user: u });
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts por usuario",
      details: error.message
    });
  }
}

const findAll = async (req, res) => {
  try {
    const result = await post.find();
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts",
      details: error.message
    });
  }
};
const findOne = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await post.find({ title: title });
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts",
      details: error.message
    });
  }
};
const remove = async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      const result = post.findOneAndRemove({ title: title })
    }
  } catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts",
      details: error.message
    });
  }
};
const update = async (req, res) => {
  try {
    const { title, abstract, content, active } = req.body;
    if (title) {
      const filter = {
        title: title
      }
      const fildsUpdate = {
        abstract: abstract,
        content: content,
        active: active
      }
      const result = post.findOneAndUpdate(filter, fildsUpdate);
    }
  } catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts",
      details: error.message
    });
  }
};

module.exports = { create, findAll, findByUser, findOne, remove, update }