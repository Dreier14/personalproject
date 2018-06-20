module.exports ={

    getCountryBlogPost: (req, res) =>{
        const {countries_id} = req.params
        const dbInstance = req.app.get('db')
        console.log("get country blog post",req.params);
        dbInstance.get_countryBlogPost(countries_id).then(countryBlogPost =>{
            console.log(countryBlogPost);
            if(countryBlogPost) res.status(200).json({countryBlogPost})
            else res.status(200).json({countryBlogPost: "Post does not exist"})
        }).catch(err => console.log('Get country blog post db error------', err));
    },
    
    createCountryBlogPost: (req, res) => {
        const {id}= req.session.user 
        const {username, picture, post, stamp, countries_id} = req.body;
        console.log("hey brandon was here" , req.body)
        // const newCountryPost = { id, username, picture, post, stamp} 
        const dbInstance = req.app.get('db');
        dbInstance.create_countryBlogPost([id, username, picture, post, stamp, countries_id]).then(countryBlogPost =>{
            console.log(countryBlogPost)
            res.status(200).json({message: 'Your post has been created!'});
        }).catch(err => console.log('Post error------------',err));

    },

    editCountryBlogPost: (req, res) => {
        const {post_id}= req.params;
        const {id}= req.session.user;
        const { post, stamp } = req.body;
        console.log(req.body, "hey req.body -------------->")
        console.log(req.params, "hey req.params------------------>");
        const dbInstance = req.app.get('db');
        dbInstance.edit_countryBlogPost([post, stamp, post_id])
        .then(response => {
            console.log('edit response---', response)
                res.status(200).json({countryBlogPost: response});
            }).catch(err => console.log('Database Error----------', err));
    },
    
    deleteCountryBlogPost: (req, res) => {
        const {post_id}= req.params;
        const {id}= req.session.user
        const dbInstance = req.app.get('db');
        console.log(req.body)
        console.log(req.params);
        dbInstance.delete_countryBlogPost(post_id).then(()=>{
        res.status(200).json({message: 'Post Deleted!'});
    }).catch(err => console.log('Post delete error----------', err))

    },
    
    getBackpackerBlogPost: (req, res) =>{
        const {topic_id} = req.params
        const dbInstance = req.app.get('db')
        dbInstance.get_backpackerblog (topic_id).then(backpackerBlog  =>{
            if(backpackerBlog) res.status(200).json({backpackerBlog})
            else res.status(200).json({backpackerBlog : "Post does not exist"})
        })
    },
    
    createBackpackerBlogPost: (req, res) => {
        const {id}= req.session.user 
        const {username, picture, post, stamp, topic_id} = req.body; 
        const dbInstance = req.app.get('db');
        dbInstance.create_backpackerblog([id, username, picture, post, stamp, topic_id]).then(backpackerBlog  =>
            { res.status(200).json(backpackerBlog);
        }).catch(err => console.log('Post error------------',err));

    },

    editBackpackerBlogPost: (req, res) => {
    
        const {post_id}= req.params;
        const {id}= req.session.user
        const { post, stamp } = req.body;
        console.log("hello",req.body, id)
        const dbInstance = req.app.get('db');
        dbInstance.edit_backpackerblog([post, stamp, post_id])
        .then(response => { console.log('edit response---', response)
            res.status(200).json({backpackerBlog: response})
        }).catch(err => console.log('Database put error', err));
    },
    
    deleteBackpackerBlogPost: (req, res) => {
        const {post_id}= req.params;
        const {id}= req.session.user
        const dbInstance = req.app.get('db');
        console.log(id);
        dbInstance.delete_backpackerblog(post_id).then(()=>{
    res.status(200).json({message: 'Post Deleted!'});
    }).catch(err => console.log('Post delete error----------', err))

  }, 

    getCountries: (req, res) =>{
    const { country, info, picture } = req.body;
    const dbInstance = req.app.get('db')
    dbInstance.get_country().then(getCountry =>{
        if(getCountry) res.status(200).json({getCountry})
        else res.status(200).json({getCountry: "Country does not exist"})
    }).catch(err => console.log('Countries unavailable ------------->', err));
  },

    getCities: (req, res) => {
      const { country_id, info, cities, picture } = req.body;
      const dbInstance = req.app.get('db')
      dbInstance.get_cities().then(getCity => {
          if(getCity) res.status(200).json({getCity})
          else res.status(200).json({getCity: "city dosent exist"})
      }).catch(err => console.log("Cities unavailable----------->", err))
  },

    getCountry: (req, res) =>{
      const { country, pictures } = req.body;
      const dbInstance = req.app.get('db')
      dbInstance.get_countries().then(getAllCountries =>{
        if(getAllCountries) res.status(200).json({getAllCountries})
        else res.status(200).json({getAllCountries: "Country does not exist"})
    }).catch(err => console.log('Countries unavailable ------------->', err));
  },

   getBackpackerBlogPostTopics: (req, res) => {
    const { topics, picture } = req.body;
    const dbInstance = req.app.get('db')
    dbInstance.backpacker_blog_topics().then(getAllTopics => {
        if(getAllTopics) res.status(200).json({getAllTopics})
        else res.status(200).json(200)({getAllTopics:"Topic doesnt Exist"})
    }).catch(err => console.log('Topic Error------------>'));
  }

}