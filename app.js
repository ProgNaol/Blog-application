import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Correct way to set the view engine

app.use(express.static("public"));

let posts = [];

app.get('/', (req, res) => {
  res.render("home", { posts });
});

app.post('/addpost', (req, res) => { // Added leading slash
  const newPost = {
    id: posts.length,
    title: req.body.title,
    content: req.body.content
  };

  posts.push(newPost);
  res.redirect("/");
});

app.get('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id); // Convert to number

  const post = posts.find(p => p.id === postId);

  if (post) {
    res.render("edit", { post });
  } else {
    res.send("Post not found");
  }
});

app.post('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id); // Convert to number

  const post = posts.find(p => p.id === postId);

  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/");
  } else {
    res.send("Post not found");
  }

  
});

app.post('/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id); // Convert to number

  posts = posts.filter(p => p.id !== postId); // Exclude post with the given ID

  res.redirect('/'); // Redirect to home
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
