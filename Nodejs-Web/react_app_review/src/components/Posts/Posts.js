import React from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router';

class Posts extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: [
                {
                    title: "첫번째글.",
                    created_at: "2016-12-20"
                }, {
                    title: "두번째글.",
                    created_at: "2016-11-20"
                }, {
                    title: "세번째글.",
                    created_at: "2016-10-20"
                }, {
                    title: "네번째글",
                    created_at: "2016-09-20"
                }, {
                    title: "다섯번째글",
                    created_at: "2016-08-20"
                }
            ]

        };
    }

    render() {
        return (
          <div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>날짜</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts.map((post, key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    <Link to={`/posts/${key}`}>{post.title}</Link>
                                </td>
                                <td>{post.created_at}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {this.props.children}
          </div>
        );
    }

}

export default Posts;
