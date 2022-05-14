DROP TRIGGER IF EXISTS covid_lore.comment_AFTER_INSERT;
delimiter $
CREATE TRIGGER comment_AFTER_INSERT AFTER INSERT ON comments FOR EACH ROW 
BEGIN
	INSERT INTO comment_scores VALUES (NEW.comment_id, NEW.user_id, DEFAULT);
END$