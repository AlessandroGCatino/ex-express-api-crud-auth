const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        const {title} = req.body;
        const data = {title}
        const newCategory = await prisma.Category.create({data})
        res.status(200).send(newCategory);
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const searchedid = req.params.id;
        const category = await prisma.Category.findUnique({
            where: { id: parseInt(searchedid) }
        });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).send({ error: "Category non trovata" });
        }
    } catch (e) {
        next(e);
    }
}

const index = async (req, res, next) => {
    try{
        const categorys = await prisma.Category.findMany({});
        res.status(200).send(categorys);
    } catch(e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try{
        const {title} = req.body
        const data = {title}

        const updatedCategory = await prisma.Category.update({
            where: { id: parseInt(req.params.id) },
            data: data
        })
        res.status(200).send({
            message: `Campo title modificato`,
            category: updatedCategory});
    } catch (e) {
        next(e);
    }

}

const destroy = async (req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const deletedCategory = await prisma.Category.delete({
            where: { id }
        })

        res.status(200).send({
            message: `La Category con ID ${deletedCategory.id} è stata eliminata`,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { create, show, index, update, destroy };