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

            res.redirect('list');
        }
        catch (ex) {
            res.send(500, { error: ex.message });
        }
    }
};

