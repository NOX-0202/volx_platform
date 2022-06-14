import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function Posts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            setLoading(true);
            const posts_req = await api.get("/posts");
            setPosts(posts_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (uuid_post) => {
        try {
            if (confirm("Deseja realmente excluir este post?")) {
                const delete_req = await api.delete(`/posts?uuid=${uuid_post}`);
                if (delete_req.success) getPosts();
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getPosts();
    }, []);

    return <main>
        <Header />
        <div className="container">
            <div className="d-flex justify-content-between my-4 ">
                <h1>Posts</h1>
                <a href='/dashboard/posts/adicionar' >
                    <button className="btn btn-success"><i className='fal fa-plus' /></button>
                </a>
            </div>
            {loading ? <div className="spinner-border text-primary text-center" role="status" /> :
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Autor</th>
                            <th scope="col">tipo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 && posts.map(post => <tr key={post.id}>

                            <td>
                                <a href={`/posts/${post.uuid}`} className="text-decoration-none text-dark">
                                    {post.title} <br />
                                    <span className='small text-muted'>{post.slug}</span>
                                </a>
                            </td>
                            <td>{post.author_name ?? "não há"}</td>
                            <td>{post.type == 'page' ? "Página" : "Banner"}</td>
                            <td>
                                <div className="d-flex gap-3 justify-content-center">
                                    <a href={`/dashboard/posts/${post.uuid}`} className="btn btn-warning">
                                        <i className='fal fa-edit' />
                                    </a>
                                    <a className="btn btn-danger" onClick={() => deletePost(post.uuid)}>
                                        <i className='fal fa-trash-alt' />
                                    </a>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>}
        </div>
    </main>;
}

export default Posts;