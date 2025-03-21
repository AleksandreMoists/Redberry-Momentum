export interface Comments {
    id: number;
    text: string;
    task_id: number;
    parent_id: null;
    author_avatar: string;
    author_nickname: string;
    sub_comments: [
        {
            id: number;
            text: string;
            task_id: number;
            parent_id: number;
            author_avatar: string;
            author_nickname: string;
        }
    ]
}

export interface CommentPayload {
    id: number;
    text: string;
    task_id: number;
    parent_id: number | null;
}