
document.addEventListener("DOMContentLoaded", async () => {
    const titleInput = document.getElementById('title');
    const imgInput = document.getElementById('img');
    const addPostBtn = document.getElementById('addPostBtn');
    const postsTable = document.getElementById('tbody');
    const loader = document.querySelector(".loader");

    const insertTableRow = (table, data) => {
        const row = table.insertRow(0);
        row.id = data.id;
        const idCell = row.insertCell(0);
        idCell.innerHTML = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        <img src="/uploads/${data.img}" class="card-img-bottom" alt="...">
      </div>`;
    }

    const displayPostsTable = (postsTable, posts) => {
        posts.forEach(post => {
            insertTableRow(postsTable, post);
        });
    }

    const getPosts = async () => {
        const req = await fetch('/posts/list/data/get');
        const { posts } = await req.json();
        return posts;
    }

    const addPost = async (formData) => {
        loader.classList.add("loader--hidden");
        const req = await fetch('/post/new', {
            method: 'POST',
            body: formData
        })
        const res = await req.json();
        loader.classList.remove("loader--hidden");

        console.log(res);
        if(!res.success){
            alert(res.error.msg);
        } 
        location.reload();
    }

    const posts = await getPosts();
    displayPostsTable(postsTable, posts);

    addPostBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const img = imgInput.files[0];
        if (title.trim() == "" || !img) {
            return alert('fill inputs please!!');
        }
        const formData = new FormData();
        formData.append('title' , title);
        formData.append('img' , img);
        await addPost(formData);
    });
});


