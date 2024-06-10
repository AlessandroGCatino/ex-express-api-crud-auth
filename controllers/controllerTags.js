const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        const {title} = req.body;
        const data = {title}
        const newTag = await prisma.Tag.create({data})
        res.status(200).send(newTag);
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const searchedID = req.params.id;
        const tag = await prisma.Tag.findUnique({
            where: { id: parseInt(searchedID) }
        });
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).send({ error: "Tag non trovato" });
        }
    } catch (e) {
        next(e);
    }
}

const index = async (req, res, next) => {
    try{
        const tags = await prisma.Tag.findMany({});
        res.status(200).send(tags);
    } catch(e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try{
        const {title} = req.body
        const data = {title}

        const updatedTag = await prisma.Tag.update({
            where: { id: parseInt(req.params.id) },
            data: data
        })
        if (updatedTag) {
        res.status(200).send({
            message: `Campo title modificato`,
            tag: updatedTag});
        } else {
            res.status(404).send({ error: "Tag non trovato" });
        }
    } catch (e) {
        next(e);
    }

}

const destroy = async (req, res, next) => {
    try{
        const deletedTag = await prisma.Tag.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(200).send({
            message: `Il Tag ${deletedTag.id} è stato eliminato`,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { create, show, index, update, destroy };