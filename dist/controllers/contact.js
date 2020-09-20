"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
/*
const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
    }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
    res.render("contact", {
        title: "Contact"
    });
};
/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = async (req, res) => {
    await express_validator_1.check("name", "Name cannot be blank").not().isEmpty().run(req);
    await express_validator_1.check("email", "Email is not valid").isEmail().run(req);
    await express_validator_1.check("message", "Message cannot be blank").not().isEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/contact");
    }
    const mailOptions = {
        to: "your@email.com",
        from: `${req.body.name} <${req.body.email}>`,
        subject: "Contact Form",
        text: req.body.message
    };
    /*
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                req.flash("errors", { msg: err.message });
                return res.redirect("/contact");
            }
            req.flash("success", { msg: "Email has been sent successfully!" });
            res.redirect("/contact");
        }); */
};
//# sourceMappingURL=contact.js.map