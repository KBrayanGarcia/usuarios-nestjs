ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `first_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `fullname` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `name`;