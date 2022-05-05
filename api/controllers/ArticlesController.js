/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: async (req, res) => {
        try {
            const articles = await Articles.find({});

            res.view('pages/list', { articles });
        }
        catch (ex) {
            res.send(500, { error: ex.message });
        }
    },

    add: (req, res) => {
        res.view('pages/add');
    },

    create: async (req, res) => {
        try {
            const title = req.body.title;
            const body = req.body.body;

            await Articles.create({ title, body });

            res.redirect('/articles/list');
        }
        catch (ex) {
            res.send(500, { error: ex.message });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;

            await Articles.destroy({ id });

            res.redirect('/articles/list');
        }
        catch (ex) {
            res.send(500, { error: ex.message });
        }
    },

    edit: async (req, res) => {
        try {
            const article = await Articles.findOne({ id : req.params.id });

            res.view(`pages/edit`, { article });
        }
        catch (ex) {
            res.send(500, { error: ex.message });
        }
    },

    update: async (req, res) => {
        try {
            await Articles.updateOne({ id : req.params.id })
                          .set({ title: req.body.title, body: req.body.body });

            res.redirect(`/articles/list`);
        }
        catch (ex) {
            res.send(500, { error: ex.message });
        }
    }
};

