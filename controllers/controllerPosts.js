const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        // prendiamo i dati necessari per la creazione del post
        const { title, slug, image, content, published, categoryID, tags, userId} = req.body;
        // definiamo la struttura di data e il collegamento con i tags
        const data = {
            title,
            slug,
            image,
            content,
            published,
            categoryID,
            userId,
            tags : {
                connect: tags.map(tagId => ({ id: tagId }))
            }
        }
        //stilizziamo lo slug
        data.slug = data.slug.toLowerCase();

        const newPost = await prisma.Post.create({data})
        res.status(200).send(newPost);

    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const searchedSlug = req.params.slug;
        const post = await prisma.Post.findUnique({
            where: { slug: searchedSlug },
            include: {
                category: {
                    select: {
                        title: true
                    }
                },
                tags: {
                    select: {
                    title: true
                    }
                },
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } catch (e) {
        next(e);
    }
}

const index = async (req, res, next) => {
    try{
        const { title, content, page=1, postPerPage=2 } = req.query;
        let { published } = req.query 

        if (published){
            if (published === "true") {
                published = true;
            } else if (published === "false") {
                published = false;
            }
        }

        // BONUS Paginazione
        const offset = (page - 1) * postPerPage;
        const totalPosts = await prisma.Post.count({ 
            where: {
                published,
                title: {
                    contains: title
                },
                content: {
                    contains: content
                }
            }});
        const totalPages = Math.ceil(totalPosts / postPerPage);

        if (page > totalPages) {
            throw new Error("La pagina richiesta non esiste.");
        }
        const posts = await prisma.Post.findMany({
            where:{
                published,
                title: {
                    contains: title
                },
                content: {
                    contains: content
                }
            },
            include: {
                category: {
                    select: {
                        title: true
                    }
                },
                tags: {
                    select: {
                    title: true
                    }
                },
                user: {
                    select: {
                        username: true
                    }
                }
            },
            take: parseInt(postPerPage),
            skip: offset
        });
        res.status(200).send({posts: posts, page: `${page} di ${totalPages}`, totalPosts: totalPosts});
    } catch(e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try{
        const { title, slug, image, content, published, categoryID, userId } = req.body;
        const tags = req.body.tags;

        // bonus: verifichiamo se l'utente che sta modificando il post è l'utente che ha creato il post

        const userEmail = req.user.email;
        const requestingUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        
        const thisPost = await prisma.Post.findUnique({
            where: {
                slug: req.params.slug
            }
        });
        
        if(requestingUser.id !== thisPost.userId){
            throw new Error("Non sei autorizzato a modificare questo post");
        }

        // definiamo la struttura di data e il collegamento con i tags
        const data = {
            ...(title && { title }),
            ...(slug && { slug }),
            ...(image && { image }),
            ...(content && { content }),
            ...(published !== undefined && { published }),
            ...(categoryID && { categoryID }),
            ...(userId && { userId }),
            ...(tags && tags.length > 0 && {
              tags: {
                set: tags.map(tagId => ({ id: tagId }))
              }
            })
          }
        //stilizziamo lo slug
        data.slug = data.slug.toLowerCase();
        const updatedPost = await prisma.Post.update({
            where: { slug: req.params.slug },
            data: data
        })
        res.status(200).send({
            message: `Campo/i ${Object.keys(data).map(param => param).join(", ")} modificati`,
            post: updatedPost});
    } catch (e) {
        next(e);
    }

}

const destroy = async (req, res, next) => {
    try{
        const checkExist = await prisma.Post.findUnique({ where: {slug: req.params.slug}});

        if(!checkExist){
            res.status(404).send({ error: "Post not found, can't delete" });
        }

        // bonus: verifichiamo se l'utente che sta eliminando il post è l'utente che ha creato il post
        const userEmail = req.user.email;
        const requestingUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        
        const thisPost = await prisma.Post.findUnique({
            where: {
                slug: req.params.slug
            }
        });
        
        if(requestingUser.id !== thisPost.userId){
            throw new Error("Non sei autorizzato a modificare questo post");
        }

        const deletedPost = await prisma.Post.delete({
            where: { slug: req.params.slug }
        });
        res.status(200).send({
            message: `Il Post "${deletedPost.slug}" eliminato`,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { create, show, index, update, destroy };