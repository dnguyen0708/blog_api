const blogs = [
    {
        id:1,
        title: "Blog One",
        body: "this is everything interesting about blog one",
        date: new Date(Date.now()).toISOString().split('T')[0],
        comments: [
            {
                id:1,
                author: "Dan",
                body: "This blog suck major D",
                date: new Date(Date.now()).toISOString().split('T')[0]
            },
            {
                id:2,
                author: "Dan 1",
                body: "This blog suck major P",
                date: new Date(Date.now()).toISOString().split('T')[0]
            },
            {
                id:3,
                author: "Dan 2",
                body: "This blog suck major C",
                date: new Date(Date.now()).toISOString().split('T')[0]
            }
        ]
    },
    {
        id:2,
        title: "Blog Two",
        body: "this is everything interesting about blog two this is everything interesting about blog two this is everything interesting about blog two",
        date: new Date(Date.now()).toISOString().split('T')[0],
        comments: [
            {
                id:1,
                author: "Dan",
                body: "This blog suck major D",
                date: new Date(Date.now()).toISOString().split('T')[0]
            },
            {
                id:2,
                author: "Dan 1",
                body: "This blog suck major P",
                date: new Date(Date.now()).toISOString().split('T')[0]
            },
            {
                id:3,
                author: "Dan 2",
                body: "This blog suck major C",
                date: new Date(Date.now()).toISOString().split('T')[0]
            }
        ]
    }
]



export {blogs}