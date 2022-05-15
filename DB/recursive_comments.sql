
WITH RECURSIVE comments_rec AS (
   SELECT
     c.comment_id,
     c.comment_date,
     u.username,
     cs.score_like,
     cs.score_dislike,
     c.description,
     c.parent_comment_id
   FROM comments c
   JOIN users u USING(user_id)
   JOIN comment_scores cs USING(comment_id)
   WHERE 
     c.post_id = 1 AND parent_comment_id IS NULL
     
   UNION ALL
   SELECT
     CURRENT.comment_id,
     CURRENT.comment_date,
     u.username,
     cs.score_like,
     cs.score_dislike,
     CURRENT.description,
	 previous.comment_id
   FROM comments AS CURRENT
   JOIN users u USING(user_id)
   JOIN comment_scores cs ON cs.comment_id = CURRENT.comment_id
   JOIN comments_rec AS previous ON CURRENT.parent_comment_id = previous.comment_id
 )
 
SELECT *
 FROM comments_rec c
 ORDER BY
   c.parent_comment_id