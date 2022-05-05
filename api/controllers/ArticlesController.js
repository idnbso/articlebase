/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function (req, res) {
        Articles.find({}).exec(function (err, articles) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.view('pages/list', { articles });
        });
    },

    add: function (req, res) {
        res.view('pages/add');
    },

    create: function (req, res) {
        const title = req.body.title;
        const body = req.body.body;

        Articles.create({ title, body }).exec(function(err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.redirect('list');
        })
    }
};

