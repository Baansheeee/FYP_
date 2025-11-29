const Joi = require("joi");

exports.registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    answer: Joi.string().min(3).required(),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.forgotSchema = Joi.object({
    email: Joi.string().email().required(),
    answer: Joi.string().required(),
    newPassword: Joi.string().min(7).required(),
});

exports.updateProfileSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(7),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/),
    username: Joi.string().alphanum().min(3).max(30),
});

exports.adminLoginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
});

exports.getUserByIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
});

// Education Validators
exports.createEducationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    category: Joi.string().valid('Cloud', 'Architecture', 'DevOps', 'Security', 'Backend', 'Frontend', 'Database', 'Other').required(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
    instructor: Joi.string().min(3).required(),
    instructor_email: Joi.string().email().required(),
    thumbnailUrl: Joi.string().uri().optional(),
    duration: Joi.number().min(0).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
});

exports.updateEducationSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    category: Joi.string().valid('Cloud', 'Architecture', 'DevOps', 'Security', 'Backend', 'Frontend', 'Database', 'Other'),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced'),
    instructor: Joi.string().min(3),
    instructor_email: Joi.string().email(),
    thumbnailUrl: Joi.string().uri().optional(),
    duration: Joi.number().min(0),
    tags: Joi.array().items(Joi.string()),
});

exports.addLectureSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(),
    videoUrl: Joi.string().uri().allow('').optional(),
    lectureNotes: Joi.string().optional(),
    duration: Joi.number().min(0).optional(),
});
