-- Active: 1684953579871@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
INSERT INTO users (id, nickname, email, password, role)
VALUES
    ('u001', 'neninha', 'thatha@email.com', '$2a$12$OaKHH2u1yFPvbJjPgM1b4uypNIzcoAmUClqkroNE0QOFtQmB4tXFC', 'ADMIN'),
    ('u002', 'neninho', 'vini@email.com', '$2a$12$tNqxSNRyyaBe37bVWRCHMuBNUq5xPgf5GgBSop90EFqpfiAh1q6Oe', 'NORMAL'),
    ('u003', 'labradoido', 'bobdylan@email.com', '$2a$12$vr.b3q/uSyLEh3bOl6eOcOsH56f3e3iLXOauWwDYg7GauPafBgHVi', 'NORMAL');

-- postagens
CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    coments INTEGER,
    created_at TEXT DEFAULT (DATETIME()),
    updated_at TEXT DEFAULT (DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
DROP TABLE posts;
INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES
    ('p001', 'u001', 'Mais um projeto em andamento!', 2, 0, DATETIME('now'), DATETIME('now')),
    ('p002', 'u002', 'Persista, Thamiris! Você consegue!', 1, 1, DATETIME('now'), DATETIME('now')),
    ('p003', 'u003', 'au au, mãe! Larga esses códigos e me leva para passear!', 0, 0, DATETIME('now'), DATETIME('now'));

-- comentários
CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
INSERT INTO comments (id, post_id, user_id, content, created_at)
VALUES
    ('c001', 'p001', 'u002', 'Continue! Não desista!', DATETIME('now')),
    ('c002', 'p001', 'u003', 'Estou ansioso para ir passear!', DATETIME('now')),
    ('c003', 'p002', 'u001', 'Cheguei até aqui! Nem acredito!', DATETIME('now'));

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE  
);
INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ('u001', 'p001', 1),
    ('u002', 'p001', 1),
    ('u002', 'p002', 1),
    ('u003', 'p003', 1),
    ('u003', 'p002', 0);
CREATE TABLE likes_dislikes_comments (
    comment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER, 
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (comment_id) REFERENCES comments (id)
);
INSERT INTO likes_dislikes_comments (comment_id, user_id, post_id, like)
VALUES
    ('c001', 'u001', 'p001', 1),
    ('c001', 'u002', 'p001', 1),
    ('c002', 'u001', 'p001', 1),
    ('c002', 'u002', 'p001', 0),
    ('c002', 'u003', 'p001', 1),
    ('c003', 'u001', 'p002', 1),
    ('c003', 'u002', 'p002', 1);

