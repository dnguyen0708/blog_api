const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.user_create_post = [
    body('username', 'username must not be blank!').trim().isLength({ min: 1 }).escape(),
    body('password', 'password must not be blank!').trim().isLength({ min: 5 }).withMessage("password must have at least 5 characters").escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() });
            return;
        }
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) return next(err);
            if (user) {
                return res.status(409).json({ errors: { msg: 'this username is already taken!' } });
            }
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) return next(err);
                const user = new User(
                    {
                        username: req.body.username,
                        password: hashedPassword
                    }
                );
                user.save(err => {
                    if (err) return next(err);
                    res.json({ user });
                });
            });
        });
    }
];

exports.user_login_post = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            if (err) return res.sendStatus(403);
        }
        if (info != undefined) {
            return res.send(info.message);
        }
        req.login(user, { session: false }, async (err) => {
            if (err) {
                res.send(err);
                return;
            }
            try {
                console.log(user);
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' });
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                const currentRefreshToken = await RefreshToken.findOne({ user: user._id }, function (err, result) {
                    if (err) return
                });
                if (!currentRefreshToken) {
                    console.log("could not find refresh token");
                }
                // return res.send('OK');
                const newRefreshToken = new RefreshToken(
                    {
                        token: refreshToken,
                        user: user._id
                    }
                )

                await newRefreshToken.save();

                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({ accessToken });
            } catch (e) {
                console.log(e);
            }
        })

    })(req, res);
}
exports.user_logout_post = (req, res, next) => {
    req.logout();
    res.send("user is logged out!");
}